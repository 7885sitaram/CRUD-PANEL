let form = document.getElementById('form')
let btn = document.getElementById('btn')
let Download = document.querySelector(".Download")
let editIndex = null;

// Personal Information
let fullName = document.getElementById("full_name");
let dob = document.getElementById("dob");
let email = document.getElementById("email");
let phone = document.getElementById("phone");

// Gender (radio buttons need a different approach)
let genderMale = document.getElementById("male");
let genderFemale = document.getElementById("female");
let genderOther = document.getElementById("other");

// Account Details
let username = document.getElementById("username");
let password = document.getElementById("password");
let role = document.getElementById("role")

// Education Details
let qualification = document.getElementById("qualification");
let ten = document.getElementById("10th") 
let twelve = document.getElementById("12th") 
let bech = document.getElementById("Bachelor") 
let master = document.getElementById("Master") 
let college = document.getElementById("college");
let passingYear = document.getElementById("passing_year");

// Professional Info
let jobTitle = document.getElementById("job_title");
let company = document.getElementById("company");
let skills = document.getElementById("skills");

// File Upload
let file = document.getElementById("file");


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let fileimges = Array.from(file.files)
    let arr = JSON.parse(localStorage.getItem('DATA')) || [];

    let gender = document.querySelector('input[name = "gender"]:checked')
    let qual = document.querySelector('input[name = "qual"]:checked')
    let skill = Array.from(document.querySelectorAll(".skill:checked")).map((check) => check.value)


    const saveData = (imageURLs) => {
        let obj = {
            full_name: fullName.value,
            dob: dob.value,
            gender: genderMale.checked ? "Male" : genderFemale.checked ? "Female" : genderOther.checked ? "Other" : "",
            email: email.value,
            phone: phone.value,

            username: username.value,
            password: password.value,
            role : role.value,

            qualification: ten.checked ? "10th" : twelve.checked ? "12th" : bech.checked ? "Bachelor" : master.checked ? "Master" : "",
            college: college.value,
            passing_year: passingYear.value,

            job_title: jobTitle.value,
            company: company.value,
            skill: skill,


            imgURL: imageURLs,
        };

        if (editIndex === null) {
            arr.push(obj)

        } else {
            arr[editIndex] = obj;
            btn.innerHTML = 'Submit'
            editIndex = null;
        }

        localStorage.setItem('DATA', JSON.stringify(arr))

        form.reset()
        display()
    }

    if (fileimges.length > 0) {
        let reader = [];
        let result = [];

        fileimges.forEach((file, idx) => {
            reader[idx] = new FileReader();

            reader[idx].onloadend = () => {
                result.push(reader[idx].result)

                if (fileimges.length === result.length) {
                    saveData(result)
                }

            }
            reader[idx].readAsDataURL(file);
        })
    } else {

        let oldImg = (editIndex !== null) ? arr[editIndex].imgURL : []
        saveData(oldImg)

    }

    Download.style.display = "block"
    
})

const display = () => {
    let update = JSON.parse(localStorage.getItem('DATA')) || []
    let tr = ""

    update.map((e, idx) => {
        tr += `
  <tr>
  <td>${idx + 1}</td>
  <td>${e.full_name}</td>
  <td>${e.dob}</td>
  <td>${e.gender}</td>
  <td>${e.username}</td>
  <td>${e.phone}</td>
  <td>${e.email}</td>
  <td>${e.password}</td>
  <td>${e.role}</td>
  <td>${e.qualification}</td>
  <td>${e.college}</td>
  <td>${e.passing_year}</td>
  <td>${e.job_title}</td>
  <td>${e.company}</td>
  <td>${e.skill}</td>


  <td>
    ${e.imgURL.map((img) => `<img src="${img}" width="100"/>`).join('')}
  </td>

  <td>
    <button onclick="edit(${idx})">Edit</button>
    <button onclick="remove(${idx})">Delete</button>
  </td>
</tr>`;

    })

    tableBody.innerHTML = tr;

}

const remove = (idx) => {
    let arr = JSON.parse(localStorage.getItem("DATA")) || [];
    arr.splice(idx, 1);
    localStorage.setItem("DATA", JSON.stringify(arr));

    Download.style.display = "none"
    display();
};

const edit = (idx) => {
    let update = JSON.parse(localStorage.getItem("DATA")) || [];
    let data = update[idx]

    fullName.value = data. full_name;
    dob.value = data.dob,
    username.value = data.username,
    phone.value = data.phone,
    email.value = data.email,
    password.value = data.password,
    role.value = data.role
    college.value = data.college,
    passingYear.value = data.passing_year,
    jobTitle.value = data.job_title,
    company.value = data.company,
    

    document.querySelector(`input[name = "gender"][value = "${data.gender}"]`).checked = true ;

    document.querySelector(`input[name = "qual"][value = "${data.qualification}"]`).checked = true ;

    document.querySelectorAll(".skill").forEach((box)=> box.checked = data.skill.includes(box.value))
 

    editIndex = idx;
    btn.innerText = "Update";
};

display();



// styling 

// Add this at the beginning of your script.js
document.addEventListener('DOMContentLoaded', function() {
    // Add tooltips to form elements
    addTooltips();
    
    // Add floating labels effect
    setupFloatingLabels();
    
    // Add character counters
    setupCharacterCounters();
  });
  
  function addTooltips() {
    const tooltipElements = [
      { selector: '#full_name', text: 'Enter your full legal name as per official documents' },
      { selector: '#dob', text: 'Your date of birth in DD/MM/YYYY format' },
      { selector: '#phone', text: '10 digit mobile number without country code' },
      { selector: '#username', text: 'Choose a unique username (5-15 characters)' },
      { selector: '#password', text: 'Minimum 8 characters with at least 1 number and 1 special character' },
      { selector: '#email', text: 'We\'ll send a confirmation email to this address' },
      { selector: '#college', text: 'Name of your university or college' },
      { selector: '#passing_year', text: 'Year you graduated or expect to graduate' },
      { selector: '#job_title', text: 'Your current position at the company' },
    //   { selector: '#file', text: 'Upload your resume in PDF or DOC format (max 5MB)' }
    ];
  
    tooltipElements.forEach(item => {
      const element = document.querySelector(item.selector);
      if (element) {
        element.classList.add('tooltip');
        const tooltipSpan = document.createElement('span');
        tooltipSpan.className = 'tooltiptext';
        tooltipSpan.textContent = item.text;
        element.parentNode.insertBefore(tooltipSpan, element.nextSibling);
      }
    });
  }
  
  function setupFloatingLabels() {
    const floatLabels = document.querySelectorAll('input, select, textarea');
    
    floatLabels.forEach(input => {
      // Skip radio and checkbox inputs
      if (input.type === 'radio' || input.type === 'checkbox') return;
      
      const label = document.querySelector(`label[for="${input.id}"]`);
      if (!label) return;
      
      input.addEventListener('focus', () => {
        label.style.transform = 'translateY(-10px)';
        label.style.fontSize = '12px';
        label.style.color = 'var(--primary-color)';
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          label.style.transform = '';
          label.style.fontSize = '';
          label.style.color = '';
        }
      });
      
      // Initialize for pre-filled values
      if (input.value) {
        label.style.transform = 'translateY(-10px)';
        label.style.fontSize = '12px';
      }
    });
  }
  
  function setupCharacterCounters() {
    const counterInputs = [
      { id: 'full_name', max: 50 },
      { id: 'username', max: 15 },
      { id: 'password', max: 30 },
      { id: 'college', max: 100 },
      { id: 'job_title', max: 50 },
      { id: 'company', max: 50 }
    ];
  
    counterInputs.forEach(item => {
      const input = document.getElementById(item.id);
      if (input) {
        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.fontSize = '12px';
        counter.style.color = '#6c757d';
        counter.style.marginTop = '5px';
        counter.style.textAlign = 'right';
        input.parentNode.insertBefore(counter, input.nextSibling);
        
        input.addEventListener('input', () => {
          const remaining = item.max - input.value.length;
          counter.textContent = `${remaining} characters remaining`;
          
          if (remaining < 10) {
            counter.style.color = remaining < 0 ? 'var(--danger-color)' : 'var(--warning-color)';
          } else {
            counter.style.color = '#6c757d';
          }
        });
      }
    });
  }
  
  // Add this to your form submit event listener before the saveData function
  const showSuccessMessage = () => {
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) existingMessage.remove();
    
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${editIndex === null ? 'Registration successful!' : 'Update successful!'}</span>
    `;
    
    form.parentNode.insertBefore(message, form);
    
    setTimeout(() => {
      message.style.opacity = '0';
      setTimeout(() => message.remove(), 300);
    }, 3000);
  };
  
  // Call showSuccessMessage() right after localStorage.setItem('DATA', JSON.stringify(arr))


  //Download button 

  document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const downloadBtn = document.getElementById('downloadBtn');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const formData = new FormData(form);
            const jsonData = {};

            for (const [name, value] of formData.entries()) {
                jsonData[name] = value;
            }

            const jsonString = JSON.stringify(jsonData, null, 2); // Pretty print JSON
            const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = 'form_data.json';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(url);
        });
    }
});
