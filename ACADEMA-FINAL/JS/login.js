const formLogin = document.getElementById("form-login");
const messageError = document.getElementById("message-error-login");
const btnLogin = document.getElementById('submit-login')



export const GET_DATA_LOGIN = () => {        
    
        btnLogin.addEventListener('click', async (e) => {
        
        const formData = new FormData(formLogin);
        const datos = Object.fromEntries(formData);
        const dataEmail = datos.email
        const dataPassword = datos.password

        try {
            const res = await fetch(`http://localhost:3000/users`)
            const dat = await res.json()
            console.log(dat)
            const EMAIL = dat.find(e => e.email == dataEmail) // filtramos el email
            const PASS = dat.find(e => e.password == dataPassword) 
            console.log(EMAIL)
            
            if (EMAIL === undefined) {
                messageError.style.color = "red";
                messageError.textContent = `El usuario ${dataEmail} no está registrado`;
                e.preventDefault();
                
            }
            else if (PASS === undefined) {
                messageError.style.color = "red";
                messageError.textContent = `La contraseña no es correcta`;
                e.preventDefault();
                
            } else {
                const div = document.getElementById('user-sesion')
                const p = document.createElement('p')
                p.textContent = `Bienvenido ${EMAIL.username}`
                div.appendChild(p)
                document.getElementById('closed').click()

            }
            
        } catch (error) {
            console.log(error)
        }
    })
}
