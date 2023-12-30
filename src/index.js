import { initializeApp } from 'firebase/app';
import { getFirestore, collection, setDoc,doc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyAUsgUODAi59ERsUXWMDXUt4q2xOkCc-Mk',
  authDomain: 'sloto-bb2fb.firebaseapp.com',
  projectId: 'sloto-bb2fb',
  storageBucket: 'sloto-bb2fb.appspot.com',
  messagingSenderId: '181033691184',
  appId: '1:181033691184:web:8fba48796a8858c17925f5',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// async function getCities(db) {
//   const citiesCol = collection(db, 'contacts');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// const cop = getCities(db).then(item=>console.log(item));
// console.log(cop);

async function saveUser(obj) {
  const usersCollection = collection(db, 'contacts');
  try {
    const newContactRef = doc(usersCollection);

    await setDoc(newContactRef, obj);
    console.log('User added successfully!');
  } catch (e) {
    console.error('Error adding user: ', e);
  }
}

//========================================================================================

const selector = document.querySelector('.button-list');
const telButton = document.querySelector('.button.tel');
const emailButton = document.querySelector('.button.email');
const input = document.querySelector('#number');
const countryCode = document.querySelector('.country-code');
const contactForm = document.querySelector('.contact-form');

selector.addEventListener('click', e => {
  if (e.target.nodeName != 'BUTTON') {
    return;
  }

  const isEmail = e.target.classList.contains('email');
  if (isEmail) {
    emailButton.classList.add('active');
    telButton.classList.remove('active');
    input.type = 'email';
    input.name = 'email';
    input.placeholder = 'Вкажіть email';
    input.style.paddingLeft = '22px';

    countryCode.style.display = 'none';
  } else {
    telButton.classList.add('active');
    emailButton.classList.remove('active');
    input.type = 'tel';
    input.placeholder = 'Вкажіть ваш номер';
    countryCode.style.display = 'flex';
    input.style.paddingLeft = '105px';
  }
});

contactForm.addEventListener('submit', hadleForm);

function hadleForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const { tel, email } = form.elements;

  const data = {
    phone: tel ? tel.value : 'undefined',
    email: email ? email.value : "undefined",
  };

  saveUser(data).then(item=>console.log(item));

  window.location.href = "https://go.scityweb.com/click?pid=449&offer_id=25&sub1=mira&sub2=forma";

  form.reset();
}
