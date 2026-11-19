# Ficha de Herói — Ramon

**Projeto Prático — Parte 2**  
**Personagem:** Ramon, Regente Emissor do universo de RPG Êxodo.

## Descrição do projeto

Este projeto apresenta uma Ficha de Herói desenvolvida em HTML, CSS e JavaScript, baseada no personagem Ramon, um Regente Emissor do universo de RPG Êxodo.

Ramon é um biólogo, cientista e explorador, conhecido por sua personalidade fria, lógica e curiosa. Sua história é marcada por acontecimentos traumáticos durante a infância, que despertaram nele uma forte busca por conhecimento, sobrevivência e respostas sobre os acontecimentos que transformaram sua vida.

A ficha apresenta suas principais informações, atributos, habilidades, resistências, equipamentos, inventário e história, além de uma área de contato com a guilda.

O projeto utiliza uma identidade visual baseada principalmente nas cores preto e dourado, buscando transmitir a atmosfera sombria e sofisticada do universo de Êxodo. Também aplica princípios de UI/UX, como hierarquia visual, contraste, consistência, proximidade e responsividade, para organizar as informações em computadores e dispositivos móveis.

## Como executar

1. Mantenha `index.html`, `style.css` e `script.js` na mesma pasta.
2. Mantenha também a pasta `Imagens` utilizada pelo HTML.
3. Abra `index.html` em um navegador atualizado.

## Funcionalidades da Parte 2

- Menu hambúrguer responsivo, com abertura e fechamento por clique.
- Inventário gerado dinamicamente a partir de um array de objetos, utilizando `forEach` e criação de elementos HTML.
- Filtros por categoria/tipo de item.
- Favoritos por item, armazenados no navegador.
- Contador do inventário atualizado conforme os itens cadastrados/exibidos.
- Progressão de XP por missões, com barra de progresso e feedback visual.
- Evolução do nível inicial 13 até o limite 20.
- Indicação da próxima missão e mensagem ao subir de nível.
- Opção de renascimento para reiniciar a progressão, com confirmação.
- História expansível e recolhível.
- Alternância de tema, com preferência salva.
- Saudação dinâmica conforme o horário local.
- Formulário da Guilda com validação dos campos, do e-mail e do consentimento.

## Pesquisa complementar

Foi utilizado `localStorage`, recurso de JavaScript para armazenar informações no navegador. Ele permite manter dados como progresso, nível, missões concluídas, renascimentos, tema e favoritos mesmo depois de atualizar a página. Esses dados ficam salvos no navegador e dispositivo utilizados.

## Decisões de UI/UX

### Parte 1 — Interface estática

- **Hierarquia visual:** títulos, subtítulos e agrupamentos ajudam a identificar as informações mais importantes.
- **Contraste:** a combinação de preto e dourado reforça a identidade visual e facilita a diferenciação dos elementos.
- **Consistência:** cores, tipografia, botões e componentes seguem um mesmo padrão visual.
- **Proximidade:** informações relacionadas são agrupadas para facilitar a leitura da ficha.
- **Responsividade:** o layout se adapta a diferentes tamanhos de tela.

### Parte 2 — Interações

- **Visibilidade do estado do sistema:** o menu indica quando está aberto; os filtros indicam a categoria ativa; a barra de XP, o nível e a próxima missão mostram a progressão.
- **Feedback imediato:** completar missão, subir de nível, favoritar item, alternar tema e validar o formulário geram respostas visíveis.
- **Prevenção de erros:** o formulário verifica os campos obrigatórios e o formato do e-mail. O renascimento pede confirmação antes de reiniciar a progressão.
- **Controle e liberdade do usuário:** menu, filtros e história podem ser fechados ou revertidos sem recarregar a página; o progresso pode ser reiniciado pelo renascimento.
- **Consistência visual:** os novos estados reutilizam as cores, tipografia, botões e transições da Parte 1.
- **Responsividade:** os componentes reorganizam-se em telas menores para manter a navegação e a leitura.
