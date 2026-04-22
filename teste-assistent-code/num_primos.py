def eh_primo(n: int) -> bool:
    """Retorna True se o inteiro n for um número primo."""
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0:
        return False

    limite = int(n ** 0.5) + 1
    for divisor in range(3, limite, 2):
        if n % divisor == 0:
            return False

    return True


if __name__ == "__main__":
    numeros_de_teste = [1, 2, 3, 4, 16, 17, 18, 19, 20, 23]

    for numero in numeros_de_teste:
        resultado = "é primo" if eh_primo(numero) else "não é primo"
        print(f"{numero}: {resultado}")
