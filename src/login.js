document.addEventListener('DOMContentLoaded', function() {

    const usersDatabase = {
        "craudiobernardo13@gmail.com": {
            password: "senha123", 
            role: "aluno",
            name: "Cláudio Bernardo"
        },
        "logogama31@gmail.com": {
            password: "admin123",
            role: "admin",
            name: "Administrador"
        }
    };

    const loginForm = document.querySelector('.login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.querySelector('.login-button');
    

    loginButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    });
    
    loginButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });


    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        emailInput.style.borderColor = '#ddd';
        passwordInput.style.borderColor = '#ddd';
        
        let isValid = true;
        

        if (!emailInput.value) {
            emailInput.style.borderColor = 'red';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
            emailInput.style.borderColor = 'red';
            isValid = false;
            alert('Por favor, insira um email válido');
        }
        

        if (!passwordInput.value) {
            passwordInput.style.borderColor = 'red';
            isValid = false;
        } else if (passwordInput.value.length < 6) {
            passwordInput.style.borderColor = 'red';
            isValid = false;
            alert('A senha deve ter pelo menos 6 caracteres');
        }
        
        if (isValid) {
            loginButton.disabled = true;
            loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Entrando...';
            

            setTimeout(function() {
      
                const user = usersDatabase[emailInput.value];
                
                if (user && user.password === passwordInput.value) {

                    localStorage.setItem('currentUser', JSON.stringify({
                        email: emailInput.value,
                        name: user.name,
                        role: user.role
                    }));
                    
                    alert(`Login bem-sucedido como ${user.name}! Redirecionando...`);
                    

                    if (user.role === 'admin') {
                        window.location.href = '../pages/admin/admin-dashboard.html';
                    } else {
                        window.location.href = '../pages/dashboard.html';
                    }
                } else {
                    alert('Email ou senha incorretos!');
                    loginButton.disabled = false;
                    loginButton.textContent = 'Entrar';
                }
            }, 1500);
        }
    });
    

    emailInput.addEventListener('input', function() {
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value)) {
            this.style.borderColor = '#1a73e8';
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (this.value.length >= 6) {
            this.style.borderColor = '#1a73e8';
        }
    });
});