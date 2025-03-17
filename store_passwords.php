<?php
$servername = "sql106.ezyro.com";
$username = "ezyro_38418489";
$password = "4305e8784edd62c2";
$dbname = "ezyro_38418489_tvaovivo";

// Criação da conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// SQL para criar tabela
$sql = "CREATE TABLE IF NOT EXISTS Senhas (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
senha VARCHAR(255) NOT NULL,
data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";

if ($conn->query($sql) === TRUE) {
    echo "Tabela Senhas criada com sucesso";
} else {
    echo "Erro ao criar tabela: " . $conn->error;
}

// Insere a senha no banco de dados
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['senha'])) {
    $senha = $_POST['senha'];

    $stmt = $conn->prepare("INSERT INTO Senhas (senha) VALUES (?)");
    $stmt->bind_param("s", $senha);

    if ($stmt->execute()) {
        echo "Nova senha inserida com sucesso";
    } else {
        echo "Erro: " . $stmt->error;
    }

    $stmt->close();
}

$conn->close();
?>

<!DOCTYPE html>
<html>
<body>

<h2>Formulário para Inserção de Senhas</h2>
<form method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
  Senha: <input type="text" name="senha">
  <input type="submit">
</form>

</body>
</html>
