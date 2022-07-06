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
         
        //modal window format - states full name not 2 letter abbrev. 
         function generateModalWindow(data, index) {
            const divModal =  document.createElement('div');
            divModal.className = 'modal-container';
            divModal.innerHTML = `
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data[index].picture.large}" alt="profile picture">
                    <h3 id="${data[index].name.last + data[index].name.first}" class="modal-name cap">${data[index].name.first} ${data[index].name.last}</h3>
                    <p class="modal-text">${data[index].email}</p>
                    <p class="modal-text cap">${data[index].location.city}</p>
                    <hr>
                    <p class="modal-text">${formatPhone(data[index].cell)}</p>
                    <p class="modal-text">${data[index].location.street.number} ${data[index].location.street.name}, ${data[index].location.city}, ${data[index].location.state} ${data[index].location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatDate(data[index].dob.date)}</p>
                </div>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
            `;
            document.querySelector('body').appendChild(divModal);
            //toggle 
            const nextButton = document.getElementById('modal-next');
            const prevButton = document.getElementById('modal-prev');
            prevButton.addEventListener('click', () => {
                divModal.remove();
                if (parseInt(index) === 0) {
                    index = '12';
                }
                document.querySelector('body').appendChild(generateModalWindow(data, (parseInt(index) - 1)));  
            });
            nextButton.addEventListener('click', () => {
                divModal.remove();
                if (parseInt(index) === 11){
                    index = '-1';
                }
                document.querySelector('body').appendChild(generateModalWindow(data, (parseInt(index) + 1)));
            });
            //close button 
            const closeButton =  document.getElementById('modal-close-btn');
            closeButton.addEventListener('click', (e)=> {
                divModal.remove();
            });
            return divModal;
        }
        