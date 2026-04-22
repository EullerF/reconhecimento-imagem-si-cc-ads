def calculate_statistics(numbers):
    """
    Calcula estatísticas básicas de uma lista de números: soma total, média, valor máximo e mínimo.

    Args:
        numbers (list): Lista de números (não vazia).

    Returns:
        tuple: (total, average, maximum, minimum)

    Raises:
        ValueError: Se a lista estiver vazia.
    """
    if not numbers:
        raise ValueError("A lista não pode estar vazia.")

    total = 0
    maximum = numbers[0]
    minimum = numbers[0]

    for num in numbers:
        total += num
        if num > maximum:
            maximum = num
        if num < minimum:
            minimum = num

    average = total / len(numbers)
    return total, average, maximum, minimum

# Exemplo de uso
numbers = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
total, average, maximum, minimum = calculate_statistics(numbers)

print(f"Total: {total}")
print(f"Média: {average}")
print(f"Maior: {maximum}")
print(f"Menor: {minimum}")