# Explicação dos erros no código

## Erros encontrados

1. `item1 = float(input(Preço do item 1? ))`
   - O texto do prompt não está entre aspas.
   - Em Python, o argumento de `input()` deve ser uma string literal.
   - Isso causa um erro de sintaxe.

2. `item2 = float(input("Preço do item 2? "))`
   - Apesar de ter aspas corretas no `input()`, a variável `item2` foi usada em um `print` sem o prefixo `f`.
   - A linha `print(" Item 2:        R$ {total_item2:.2f}")` exibe chaves literais em vez do valor formatado.

3. `item3 = float(input("Preço do item 3? "))`
   - O prompt também estava sem aspas, causando erro de sintaxe.

4. `desconto_cupom = (input("Você tem um cupom de desconto? (Digite o percentual ou 0): "))`
   - `input()` retorna uma string.
   - Em seguida, o código tenta fazer `desconto_cupom / 100`, o que falha porque não é um número.
   - É necessário converter para `float` ou `int` antes de calcular o desconto.

5. `if desconto_cupom > 0:`
   - A declaração `if` não estava corretamente indentada, o que causa um erro de sintaxe.
   - Além disso, comparar a string retornada por `input()` com `0` não funciona como esperado.

## Correções aplicadas

- Adicionei aspas nos prompts de `input()` para `item1`, `item2` e `item3`.
- Consertei o `print` do `Item 2` para usar `f-string` corretamente.
- Converti `desconto_cupom` para `float` antes do cálculo do desconto.
- Indentei corretamente o bloco `if desconto_cupom > 0:`.
- Ajustei a formatação do total final usando `:.2f`.
