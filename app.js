// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDkR3vgthrF-UqkLQ--dDx9lVabBgJXnGs",
    authDomain: "ticket-follower.firebaseapp.com",
    projectId: "ticket-follower",
    storageBucket: "ticket-follower.appspot.com",
    messagingSenderId: "230964594360",
    appId: "1:230964594360:web:c7283dda46e06762d6164d"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const addButton = document.getElementById('addButton');
const ticketIdInput = document.getElementById('ticketIdInput');
const ticketList = document.getElementById('ticketList');

addButton.addEventListener('click', async function() {
    const ticketId = ticketIdInput.value.trim();
    if (ticketId !== '') {
        try {
            await db.collection('tickets').add({
                ticketId: ticketId,
                resolved: false
            });
            ticketIdInput.value = '';
        } catch (error) {
            console.error('Error adding ticket: ', error);
        }
    }
});

db.collection('tickets').onSnapshot(snapshot => {
    ticketList.innerHTML = '';
    snapshot.forEach(doc => {
        const listItem = document.createElement('li');
        listItem.textContent = doc.data().ticketId;

        const resolveButton = document.createElement('button');
        resolveButton.textContent = 'Resolve';
        resolveButton.className = 'resolveButton';
        resolveButton.addEventListener('click', async () => {
            try {
                await db.collection('tickets').doc(doc.id).delete();
            } catch (error) {
                console.error('Error resolving ticket: ', error);
            }
        });

        listItem.appendChild(resolveButton);
        ticketList.appendChild(listItem);
    });
});
