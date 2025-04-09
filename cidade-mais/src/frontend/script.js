function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
}


function TranformaDadosJson(dados) {
    let jsonDados = JSON.stringify(dados);
    console.log("JSON convertido:", jsonDados);
    return jsonDados; // Retornar o JSON para evitar erro
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    const dados = { username: username, password: password };

    alert(username);
    alert(password);

    let json = TranformaDadosJson(dados);
    alert(json);
    console.log(json);
});

