 //DOB in randomuser.me/api lists DOB as YEAR/MO/DAY 4/2/2, restructure as MO/DY/YR 2/2/4 so it appears in US bday order on the ui 
    const birthdayRestructure = (birthday) => {
        let birthdayRestruct = new Date(birthday).toLocaleDateString('en-US', { year: '4-digit', month: 'numeric', day: 'numeric' });
        return birthdayRestruct;
    }
    
    //Setting up variables with unstuctured data in randomuser so I can easily call variables with newly structured data in successive steps 
    const employeeData = (data) => {
        let image = data.picture.large;
        let name = `${data.name.first} ${data.name.last}`;
        let email = data.email;
        let username = data.login.username;
        let cell = data.phone;
        let fullAddress = `${data.location.street}, ${data.location.city}, ${data.location.state} ${data.location.postcode}`;
        let birthday = birthdayRestructure(data.dob);
        
  