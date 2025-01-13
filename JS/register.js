const formRegister = document.getElementById("form-register");
const messageError = document.getElementById("message-error-register");

export const GET_DATA = () => {
    formRegister.addEventListener('input', async () => {
        //Añadimos evento input, lanzamos fecht GET para recorrer el mismo y filtrar elusuario y el email
        const btnSubmit = document.getElementById('submit-register')
        const formData = new FormData(formRegister);
        const datos = Object.fromEntries(formData);
        const dataUsername = datos.username
        const dataEmail = datos.email
        console.log(datos)

        try {
            const res = await fetch(`http://localhost:3000/users`)
            const dat = await res.json()
            const USER = dat.find(e => e.username == dataUsername) // filtramos el username
            const EMAIL = dat.find(e => e.email == dataEmail) // filtramos el email

            // Si el dato recogido es undefined es porque no está en el Json, caso contrario ya existe y no permitirá registrare

            if (dataUsername === '') {
                messageError.textContent = '';
                btnSubmit.disabled = false;
            }
            else if (USER !== undefined) {
                messageError.style.color = "red";
                messageError.textContent = `El usuario ${dataUsername} ya está registrado`;
                btnSubmit.disabled = true;
            }
            else if (EMAIL !== undefined) {
                messageError.style.color = "red";
                messageError.textContent = `El email ${dataEmail} ya está registrado`;
                btnSubmit.disabled = true;
            } else if (USER === undefined) {
                messageError.textContent = '';
                messageError.style.color = "green";
                btnSubmit.disabled = false
            }
        } catch (error) {
            console.log(error)
        }
    })
}


export const POST_DATA = () => {
    
    formRegister.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(formRegister);
        const datos = Object.fromEntries(formData);

        if (datos.username === '' || datos.email === '' || datos.password === '') {
            messageError.style.color = "red";
            messageError.textContent = "Campos imcompletos, revisar";
            console.log('de aqui no paso')
            return;
        } else {
            try {
                const postResponse = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                })
                const dataResponse = await postResponse.json()
            } catch (error) {
                console.log(error)
            }
        }


    });
};
