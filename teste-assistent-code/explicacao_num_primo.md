# Explicação do código `num_primos.py`

Este arquivo define a função `eh_primo(n)` para verificar se um número inteiro `n` é primo.

## Como a função funciona

1. Trata casos especiais:
   - `n <= 1`: não são primos (`False`).
   - `n <= 3`: `2` e `3` são primos (`True`).
2. Descarta múltiplos de `2`:
   - Se `n` for par e maior que `2`, retorna `False` imediatamente.
3. Calcula o limite de verificação:
   - `limite = int(n ** 0.5) + 1`
   - Isso define até onde buscar possíveis divisores.
4. Verifica apenas divisores ímpares:
   - Usa `range(3, limite, 2)` para testar `3, 5, 7, ...`.
   - Se `n % divisor == 0`, retorna `False`.
5. Se nenhum divisor for encontrado, retorna `True`.

## Por que testar até a raiz quadrada de `n`?

Se `n` tem um divisor maior que `1`, ele sempre aparece em um par de divisores `a` e `b` tal que `a * b = n`.
Se ambos fossem maiores que a raiz quadrada de `n`, o produto seria maior que `n`. Por isso, basta buscar até `sqrt(n)`.

## Por que o código está mais limpo?

- Usa tipagem simples com `n: int -> bool`.
- Evita variáveis de controle desnecessárias.
- Usa `range` com passo `2` para testar apenas divisores ímpares.
- O nome `numeros_de_teste` torna o bloco principal mais legível.

## Pra que serve o bloco `if __name__ == "__main__"`?

Esse bloco permite executar um teste rápido quando o arquivo é rodado diretamente.

- Define a lista `numeros_de_teste` com alguns valores de exemplo.
- Imprime o resultado formatado para cada número.

## Uso

1. Salve o arquivo.
2. Execute no terminal:

```bash
python teste-assistent-code/num_primos.py
```

O programa exibirá quais valores da lista são primos.
