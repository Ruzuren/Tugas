from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from sqlalchemy import text
import base64
import uuid

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI']='postgresql://postgres:123456@localhost:5432/perpustakaan'
app.config['SECRET_KEY']='secret'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

#################################################################################################

class Userz(db.Model):
    user_id = db.Column(db.Integer, primary_key = True, index =True)
    full_name = db.Column(db.String(45), nullable = False)
    user_name = db.Column(db.String(25), nullable = False)
    email = db.Column(db.String(45), nullable = False, unique = True)
    password = db.Column(db.String, nullable = False)
    is_admin = db.Column(db.Boolean, default = False)
    rent_user = db.relationship('Administration', backref = 'renter', lazy = 'dynamic')

    def __repr__(self):
        return f'Userz <{self.email}>'

class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key = True, index = True)
    book_name = db.Column(db.String(45), nullable = False)
    release_year = db.Column(db.String(10), nullable = False)
    book_author = db.Column(db.String(45), nullable = False)
    publisher = db.Column(db.String(45), nullable = False)
    book_count = db.Column(db.Integer, nullable = False, default = 1)
    # book_borrowed = db.Column(db.Integer, nullable = False, default = 0)
    rent_book = db.relationship('Administration', backref = 'bookr', lazy = 'dynamic')

    def __repr__(self):
        return f'Book <{self.book_name}>'

class Administration(db.Model):
    booking_id = db.Column(db.Integer, primary_key = True, index = True)
    rent_date = db.Column(db.String(25), nullable = False)
    rent_due = db.Column(db.String(25), nullable = False)
    is_returned = db.Column(db.Boolean, default = False)
    return_date = db.Column(db.String(25))
    fine = db.Column(db.Integer, nullable = False, default = 0)
    user_id = db.Column(db.Integer, db.ForeignKey('userz.user_id'), nullable = False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable = False)

    def __repr__(self):
        return f'Administration <{self.booking_id}>'

#################################################################################################

def get_userData(id):
    return Userz.query.filter_by(user_id=id).first_or_404()

def get_bookData(id):
    return Book.query.filter_by(book_id=id).first_or_404()

def get_rentData(id):
    return Administration.query.filter_by(booking_id=id).first_or_404()

def authz():
    token = request.headers.get('Authorization')
    token2 = token.replace("Basic ","")
    plain = base64.b64decode(token2).decode('utf-8')
    plain3 = plain.split(":")
    user = Userz.query.filter_by(user_name=plain3[0]).first()
    a = False
    if user is None :
        return a
    else: 
        hashcheck = bcrypt.check_password_hash(user.password, plain3[1])
        return hashcheck

def get_auth(user_name, password):
    return Userz.query.filter_by(user_name=user_name, password=password).first()

def return_user(u):
    return {'user id' : u.user_id,'username':u.user_name,'full name':u.full_name, 'email' : u.email, 'is admin': u.is_admin}

def return_book(b):
    return {'book id' : b.book_id,'book name':b.book_name, 'author': b.book_author,
        'release year' : b.release_year, 'publisher' : b.publisher, 'stock' : b.book_count}

def return_rent(rent):
    return {"1 Booking Information":{
                'Booking id': rent.booking_id, 
                'Rent date':rent.rent_date, 
                'Rent due': rent.rent_due, 
                'Is returned': rent.is_returned, 
                'Return date':rent.return_date, 
                'Fine': rent.fine
            },
            '2 Renter Information':{  
                'Name':rent.renter.full_name, 
                'Email': rent.renter.email, 
                'User id': rent.renter.user_id
                }, 
            '3 Book Information':{ 
                'Book id': rent.bookr.book_id, 
                'Book name': rent.bookr.book_name, 
                'Release year': rent.bookr.release_year, 
                'Book Author': rent.bookr.book_author, 
                'Book Publisher': rent.bookr.publisher
            }
        }

def get_hash(password):
    return bcrypt.generate_password_hash(password).decode('utf-8')

def get_fine(b, a): #rent_due, return_date
    x = a.split("/")
    y = b.split("/")
    d1 = int(x[0])
    d2 = int(y[0])
    m1 = int(x[1])
    m2 = int(y[1])
    y1 = int(x[2])
    y2 = int(y[2])
    if y1>y2:
        return 10000
    elif m1>m2 and y1==y2:
        m = (m1-m2)*500
        return m
    elif d1>d2 and y1==y2 and m1==m2:
        d = (d1-d2)*15
        return d
    else:
        return 0

def count_stock(book_id):
    qry = Administration.query.filter_by(is_returned=False, book_id=book_id).count()
    return qry

#################################################################################################

@app.route('/users/')
def get_users():
    return jsonify([return_user(user) for user in Userz.query.all()
    ])

@app.route('/books/')
def get_books():
    return jsonify([
        return_book(book) for book in Book.query.all()
    ])

@app.route('/users/<id>/')
def get_user(id):
    user = get_userData(id)
    return return_user(user)

@app.route('/books/<id>/')
def get_book(id):
    book = get_bookData(id)
    return return_book(book)

@app.route('/users/',methods=['POST'])
def create_user():
    data = request.get_json()
    if not 'user_name' in data or not 'email' in data or not 'full_name' in data:
        return jsonify({
            'error' : 'Bad Request',
            'message' : 'Username, Full name or Email is not given'
        }), 400
    if len(data['user_name']) < 4 or len(data['email']) < 6:
        return jsonify({
            'error' : 'Bad Request',
            'message' : 'Username and Email must contain a minimum of 4 and 6 letters respectively'
        }), 400
    hash = get_hash(data['password'])
    u = Userz(
            user_name= data['user_name'],
            full_name= data['full_name'],
            email= data['email'],
            is_admin= data.get('is admin', False),
            password= hash
        )
    db.session.add(u)
    db.session.commit()
    return  return_user(u), 201

@app.route('/books/',methods=['POST'])
def create_book():
    data = request.get_json()
    if not 'book_name' in data or not 'year' or not 'author' or not 'publisher' or not 'stock' in data:
        return jsonify({
            'error' : 'Bad Request',
            'message' : 'One or more of the following field is empty: book_name, year, author, publisher, stock'
        }), 400
    if len(data['book_name']) < 4:
        return jsonify({
            'error' : 'Bad Request',
            'message' : 'Book Name must contain a minimum of 4 letters'
        }), 400
    b = Book(
            book_name= data['book_name'], release_year= data['year'], book_author= data['author'],
            publisher= data['publisher'], book_count= data['stock']
        )
    db.session.add(b)
    db.session.commit()
    return  return_book(b), 201

@app.route('/users/<id>/',methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = get_userData(id)
    if 'user_name' in data:
        user.user_name=data['user_name']
    if 'full_name' in data:
        user.full_name=data['full_name']
    if 'email' in data:
        user.email=data['email']
    if 'is admin' in data:
        user.is_admin=data['is admin']
    db.session.commit()
    return jsonify({'Success': 'User data has been updated'}, return_user(user))

@app.route('/books/<id>/',methods=['PUT'])
def update_book(id):
    data = request.get_json()
    book = get_bookData(id)
    if 'book_name' in data:
        book.book_name=data['book_name']
    if 'year' in data:
        book.release_year=data['year']
    if 'author' in data:
        book.book_author=data['author']
    if 'publisher' in data:
        book.publisher=data['publisher']
    if 'stock' in data:
        book.book_count=data['stock']
    db.session.commit()    
    return jsonify({'Success': 'Book data has been updated'}, return_book(book))

@app.route('/users/<id>/',methods=['DELETE'])
def delete_user(id):
    user = Userz.query.filter_by(user_id=id).first_or_404()
    db.session.delete(user)
    db.session.commit()
    return {
        'success': 'User data deleted successfully'
    }

@app.route('/books/<id>/',methods=['DELETE'])
def delete_book(id):
    book = Book.query.filter_by(book_id=id).first_or_404()
    db.session.delete(book)
    db.session.commit()
    return {
        'success': 'Book data deleted successfully'
    }

#################################################################################################

@app.route('/rents/', methods=['GET'])
def get_rents():
    login = authz()
    if login:
        return jsonify([return_rent(rent) for rent in Administration.query.all()])
    else: return {"Error":"Wrong Username or Password"}

@app.route('/rents/<id>/', methods=['GET'])
def get_rent(id):
    login = authz()
    if login:
        rent = get_rentData(id)
        user = get_userData(id)
        return jsonify([return_rent(rent)])
    else: return {"Error":"Wrong Username or Password"}

@app.route('/rents/users/<id>', methods=['GET'])
def get_rent_users(id):
    login = authz()
    if login:
        rent = Administration.query.filter_by(user_id=id)
        return jsonify([
            {
                "Book Name" : bookx.bookr.book_name,
                "Renter Name" : bookx.renter.full_name,
                "Rent Date" : bookx.rent_date,
                "Rent Due" : bookx.rent_due
                 
            }for bookx in Administration.query.filter_by(user_id=id)
        ])

@app.route('/rents/books/<id>', methods=['GET'])
def get_rent_books(id):
    login = authz()
    if login:
        rent = Administration.query.filter_by(book_id=id)
        return jsonify([
            {
                "Book Name" : userx.bookr.book_name,
                "User Name" : userx.renter.full_name,
                "Rent Date" : userx.rent_date,
                "Rent Due" : userx.rent_due,
                "Is returned" : userx.is_returned
                 
            }for userx in Administration.query.filter_by(book_id=id)
        ])

@app.route('/rents/',methods=['POST']) # PEMINJAMAN
def create_rent():
    data=request.get_json()
    login = authz()
    if login:
        book = Book.query.filter_by(book_id=data['book_id']).first()
        book_count = count_stock(book.book_id)
        if book_count == book.book_count:
            return {"Error":"Sorry, this book has been rented out, please wait"}
        else :
            is_returned = data.get('is returned', False)
            # book = Book
            rent = Administration(
                rent_date = data['rent date'], rent_due = data['rent due'], user_id=data['user_id'], 
                book_id=data['book_id'], is_returned=is_returned
            )
            db.session.add(rent)
            db.session.commit()    
            return jsonify([{"Success": "Rent data has been saved"}, return_rent(rent)]), 201 
    else: return {"Error":"Wrong Username or Password"}

@app.route('/rents/<id>/',methods={'PUT'}) # PENGEMBALIAN
def update_rent(id):
    data = request.get_json()
    login = authz()
    if login:
        rent = get_rentData(id)
        if 'rent date' in data:
            rent.rent_date = data.get('rent date', rent.rent_date)
        if 'rent due' in data:
            rent.rent_due = data.get('rent due', rent.rent_due)
        if 'is returned' in data:
            rent.is_returned=data['is returned']
            if rent.is_returned:
                rent.return_date = data['return date']
                count_fine = get_fine(rent.rent_due,rent.return_date)
                rent.fine = count_fine
        db.session.commit() 
        return jsonify([{"Success": "Rent data has been updated"}, return_rent(rent)]), 201 
    else: return {"Error":"Wrong Username or Password"}

@app.route('/rents/<id>/', methods=['DELETE'])
def delete_rent(id):
    login = authz()
    if login:
        rent = Administration.query.filter_by(booking_id=id).first_or_404()
        # Book(book_count+=1)
        db.session.delete(rent)
        db.session.commit()
        return {
            'success': 'Rent data deleted successfully'
        }  
    else: return {"Error":"Wrong Username or Password"}