document.addEventListener('DOMContentLoaded', function() {  
    
    // pagination selector
    const p1 = document.querySelector(".one")
    const p2 = document.querySelector(".two")
    const p3 = document.querySelector(".three")
    // const p4 = document.querySelector(".four")
    // const p5 = document.querySelector(".five")

    // search user
    const search_bar = document.querySelector(".search_bar")
    const searchName = document.querySelector('.s_name');

    //  sorting
    const sortName = document.querySelector(".sort-name")
    const sortId = document.querySelector(".sort-id")
    let isSortName = false
    let isSortId = false
    let offsetx = 0

    // if you click search_bar button
    search_bar.onclick = e => {
        e.preventDefault()
        searchUser(searchName.value)
            .then(users => {
            const userTable = document.querySelector('#userTable');
            const tbody = userTable.querySelector('tbody');
            console.log("TOTAL: ", users)
        
            tbody.innerHTML = '';
            let sortedUsers = users.sort((a,b) => a.user_id - b.user_id)
            sortedUsers.forEach(item => {
            const row = createHTMLRow({ 
                id: item.user_id, 
                name: item.full_name, 
                username: item.username, 
                password: item.password, 
                email: item.email 
            });
        tbody.appendChild(row);
        })   
        })
    console.log(searchName.value)
    }

    // if you click sortName
    sortName.onclick = e => {
        e.preventDefault()
  
        isSortName = true
        isSortId = false
        getSortUserName()
    }

    // if you click sortID
    sortId.onclick = e => {
        e.preventDefault()
  
        isSortId = true
        isSortName = false
        getSortUserID()
    }

    let limit = 5
    getUserWithPagination(0, limit)
    
    // if you click p1
    p1.onclick = () => {
        p1.disabled = true
        p2.disabled = false
        p3.disabled = false
        let offset = Number(p1.innerHTML) - 1
        offsetx = 0
        if(!isSortName && !isSortId){
            getUserWithPagination(offset, limit)
        } 
        else if (isSortName && !isSortId){
            getSortUserName(offsetx, limit)
        }
        else if (isSortId && !isSortName){
            getSortUserID(offsetx, limit)
        }
    }

    // if you click p2
    p2.onclick = () => {
        p1.disabled = false
        p2.disabled = true
        p3.disabled = false
        let offset = +(p2.innerHTML -1) * limit
        offsetx = 5
        if(!isSortName && !isSortId){
            getUserWithPagination(offset, limit)
        } 
        else if (isSortName && !isSortId){
            getSortUserName(offsetx, limit)
        }
        else if (isSortId && !isSortName){
            getSortUserID(offsetx, limit)
        }   
    }

    // if you click p3
    p3.onclick = () => {
        p1.disabled = false
        p2.disabled = false
        p3.disabled = true
        let offset = +(p3.innerHTML -1) * limit
        offsetx = 10
        if(!isSortName && !isSortId){
            getUserWithPagination(offset, limit)
        } 
        else if (isSortName && !isSortId){
            getSortUserName(offsetx, limit)
        }
        else if (isSortId && !isSortName){
            getSortUserID(offsetx, limit)
        }   
    }

    function totalUsers(){
        return fetch('http://localhost:5000/user/number')
        .then(response => response.json())
        .then(json => json);
    }

    const prevButton = document.querySelector(".prev-Button")
    const nextButton = document.querySelector(".next-Button")

    prevButton.onclick = e => {
        e.preventDefault()
        if(offsetx != 0){
            offsetx -= 5
            if(!isSortName && !isSortId){
                getUserWithPagination(offsetx, limit)
            } else if (isSortName && !isSortId){
                getSortUserName(offsetx, limit)
            }
            else if (isSortId && !isSortName){
                getSortUserID(offsetx, limit)
            }
        }
    };

    nextButton.onclick = e => {
        e.preventDefault()
        // if(offsetx < totalUsers.value - limitx){
            offsetx += 5
            if(!isSortName && !isSortId){
                getUserWithPagination(offsetx, limit)
            } else if (isSortName && !isSortId){
                getSortUserName(offsetx, limit)
            }
            else if (isSortId && !isSortName){
                getSortUserID(offsetx, limit)
            }
        // }
        };
    });

    //  
    function getUserWithPagination(offset, limit){
        getUsers(offset, limit).then(result => {
            const {data, total} = result
            let users = data
        
            const userTable = document.querySelector('#userTable');
            const tbody = userTable.querySelector('tbody');
            console.log("TOTAL: ", total)
        
            tbody.innerHTML = '';
            let sortedUsers = users.sort((a,b) => a.user_id - b.user_id)
            sortedUsers.forEach(item => {
            const row = createHTMLRow({ 
                id: item.user_id, 
                name: item.full_name, 
                username: item.username, 
                password: item.password, 
                email: item.email 
            });
            tbody.appendChild(row);
            })    
        });
        }
    
    function getSortUserName(offset, limit){
        sortUserName(offset, limit).then(users => {
        const userTable = document.querySelector('#userTable');
        const tbody = userTable.querySelector('tbody');
    
        tbody.innerHTML = '';
        users.forEach(item => {
        const row = createHTMLRow({ 
            id: item.user_id, 
            name: item.full_name, 
            username: item.username, 
            password: item.password, 
            email: item.email
        });
        tbody.appendChild(row);
        })
        });
    }

    function getSortUserID(offset, limit){
        sortUserId(offset, limit).then(users => {
        const userTable = document.querySelector('#userTable');
        const tbody = userTable.querySelector('tbody');
    
        tbody.innerHTML = '';
        users.forEach(item => {
        const row = createHTMLRow({ 
            id: item.user_id, 
            name: item.full_name, 
            username: item.username, 
            password: item.password, 
            email: item.email
        });
        tbody.appendChild(row);
        })
        });
    }