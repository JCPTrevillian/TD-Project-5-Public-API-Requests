 //connecting api (html to js)
const peopleUrl = 'https://randomuser.me/api/?results=12&nat=us';
const galleryDiv = document.getElementById('gallery');
const searchDiv =  document.querySelector('.search-container'); 
        
      
         //initiate fetch for parsed data for ui 
        async function getData(url) {
            const userResponse = await fetch(url).catch(e => console.log('Error fetching data: ', e) );
            const userJSON = await userResponse.json();
            const users = userJSON.results.map(async user => user);
            return Promise.all(users);
        }
        
        //phone number format 
        function formatPhone (phoneNumber) {
            const regex = /^\D*(\d{3})\D*(\d{3})\D*(\d{4})\D*$/;
            return phoneNumber.replace(regex, '($1) $2-$3');  
        }
        
        //data for user directory/gallery 
        function generateGallery(data) {
            data.map((person, index) => {
                const divIndex = index;
                const divEl = document.createElement('div');
                divEl.className = 'card';
                divEl.dataset.index = divIndex;
                divEl.innerHTML = `
                <div class="card-img-container">
                    <img class="card-img" src="${person.picture.large}" alt="profile picture">
                </div>
                <div class="card-info-container">
                    <h3 id="${person.name.last + person.name.first}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
                    <p class="card-text">${person.email}</p>
                    <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
                </div>
                `;
                galleryDiv.appendChild(divEl);
            });
        }
        
        
         //birthday format - orig data form not mo/dy/year 2/2/4, fix that. 
        function formatDate (dateOfBirth){
            let newDate = new Date(dateOfBirth).toISOString().split('T')[0].split('-');
            newDate = `${newDate[1]}/${newDate[2]}/${newDate[0]}`;
            return newDate;
        }
        
        