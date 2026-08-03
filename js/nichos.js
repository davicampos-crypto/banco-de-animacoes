/* ============================================================
   nichos.js — Curadoria do banco de animações por NICHO comercial
   ------------------------------------------------------------
   A Impero Solutions monta sites-proposta para prospects e abre
   o banco já filtrado pelo nicho do cliente. Cada nicho traz:
     - nome:  rótulo exibido na UI
     - desc:  a "tese" estética do nicho em uma linha
     - itens: mapa id -> porquê comercial (onde a animação entra
              no site do nicho e que efeito causa no visitante)
   Os ids referenciam os itens de js/data/*.js. Um mesmo item
   pode aparecer em mais de um nicho, com porquês diferentes.
   ============================================================ */
window.NICHOS = {

  construcao: {
    nome: 'Construção & Arquitetura',
    desc: 'Sobriedade e peso: reveals estruturais, números de obra, traço de projeto.',
    itens: {
      e01:  'Reveal padrão para todo o site institucional: cada bloco entra firme, sem exagero — passa a mesma solidez que se espera de uma construtora.',
      e02:  'No grid de obras entregues, os cards entram em cascata como fileiras de tijolos assentando — o portfólio parece se construir na tela.',
      e03:  'No hero, o texto sobe de dentro da máscara como uma estrutura se erguendo do chão — abertura institucional com peso.',
      e04:  'A cortina/diagonal de clip-path revela fotos de obra como quem retira o tapume — cada seção "inaugura" diante do visitante.',
      e08:  'No manifesto da empresa, cada linha do texto se revela em sequência — o discurso institucional ganha cadência de quem fala com calma e autoridade.',
      e10:  'A planta baixa ou o logo em SVG se desenham traço a traço na abertura — o visitante vê o "risco do projeto" nascer, linguagem nativa de arquitetura.',
      e11:  'Na faixa de credibilidade, m² construídos e obras entregues sobem do zero diante do visitante — número que se move convence mais que número impresso.',
      e12:  'Nas competências (estrutura, acabamento, gestão), as barras preenchem em cascata — capacidade técnica mostrada como medição, não como adjetivo.',
      ex01: 'O odômetro rola os dígitos de "anos de mercado" e "m² entregues" como um hidrômetro de obra — a métrica ganha materialidade mecânica.',
      ex02: 'Nas fotos de obra, a moldura abre para um lado e a imagem escala para o outro — reveal de revista de arquitetura, sem nenhum "puxão".',
      ex05: 'Títulos de seção aparecem com borda esfumada pela máscara de gradiente — transição de material, discreta como acabamento bem feito.',
      ex06: 'O nome da construtora nasce esparramado e "assenta" no lugar — a própria tipografia encena o gesto de assentar estrutura.',
      t09:  'O título de contorno se preenche no hover como concreto preenchendo a fôrma — metáfora direta do ofício aplicada à marca.',
      t10:  'Abertura do hero em três tempos (máscara, escala, peso) — a home começa com a gravidade de uma placa de inauguração.',
      d01:  'Na seção de resultados, as barras de obras por ano crescem com stagger — o histórico da empresa vira um gráfico que sobe na frente do cliente.',
      s01:  'No hero, camadas da fachada em parallax dão profundidade de maquete — a obra parece tridimensional antes mesmo do portfólio.',
      s02:  'O header encolhe e ganha fundo ao rolar — navegação sempre à mão sem roubar espaço das fotos de obra em tela cheia.',
      s04:  'Na página de metodologia, o painel fixo troca a imagem a cada etapa (fundação → estrutura → acabamento) enquanto o texto rola — o processo construtivo vira narrativa guiada.',
      s06:  'Na seção do empreendimento-destaque, o scroll controla escala e posição da fachada — o visitante "conduz" a apresentação como numa visita técnica.',
      s07:  'A sequência de frames scrubada pelo scroll mostra a obra evoluindo do terreno ao prédio pronto — o timelapse da construção sob controle do visitante.',
      s10:  'O hero com a foto aérea da obra cresce e escurece enquanto o conteúdo sobe — entrada cinematográfica que valoriza fotografia de empreendimento.',
      s12:  'Entre empreendimentos, um painel sólido sobe como tapume trocando de "cena" — cada projeto ganha seu próprio ato.',
      sx01: 'O header some na descida e volta na subida — as imagens de obra ocupam a tela inteira sem que o visitante perca a navegação.',
      sx05: 'A linha do tempo em SVG desenha a história da empresa e acende cada marco (fundação, primeira torre, prêmio) conforme o scroll chega — trajetória virando traço de projeto.',
      sx10: 'Na galeria de obras, uma coluna sobe e a outra desce durante o scroll — fotos estáticas de canteiro ganham vida sem nenhum efeito lúdico.',
      a06:  'O smooth scroll com inércia dá ao site inteiro o andamento pausado e pesado de material de peso — nada "pipoca", tudo desliza.',
      l02:  'Na troca de páginas, painéis verticais fecham e abrem como portas de container — transição sóbria que reforça o vocabulário do canteiro.',
      l06:  'No preloader, o logo da construtora se desenha em traço e depois preenche — a marca nasce como um projeto sendo riscado na prancheta.',
      h08:  'No portfólio, a foto amplia dentro da moldura fixa no hover — o visitante "aproxima a lupa" da obra sem quebrar o alinhamento do grid.',
      fx09: 'As linhas topográficas se movendo lentamente ao fundo da seção de terrenos/loteamentos remetem a curvas de nível de levantamento — fundo vivo que fala a língua do setor.'
    }
  },

  ecommerce: {
    nome: 'E-commerce',
    desc: 'Usabilidade e navegação: filtros que não desorientam e micro-feedback que guia a compra.',
    itens: {
      /* --- (a) filtros e organização de catálogo --- */
      n05:  'Nas abas de categoria do catálogo, o indicador desliza até a aba ativa — o cliente sempre sabe em que recorte da loja está.',
      n06:  'No filtro lateral e no FAQ de produto, os acordeões abrem com altura animada — o cliente expande só o que interessa sem a página "pular".',
      x08:  'Ao aplicar um filtro ou ordenação, o grid se reorganiza com FLIP em vez de piscar — o cliente nunca perde o contexto do que estava vendo.',
      nx03: 'O segmented control arrastável alterna visualização (grade/lista) ou faixas de tamanho — filtro tátil que responde ao dedo no mobile.',
      nx01: 'A busca estilo command palette filtra produtos a cada tecla com o fundo desfocado — quem já sabe o que quer chega ao produto em segundos.',
      nx09: 'O infinite scroll com sentinela carrega a próxima página do catálogo antes de o cliente chegar ao fim — a vitrine nunca "acaba" nem trava.',
      nx10: 'O breadcrumb animado mostra o caminho Loja › Categoria › Produto deslizando a cada nível — voltar um passo no catálogo vira gesto natural.',
      qx05: 'No filtro de preço, a bolha mostra o valor durante o arrasto do slider — o cliente ajusta a faixa vendo exatamente onde está.',
      hx11: 'Na tabela de comparação de produtos, um único realce desliza entre as linhas — o olho segue a linha comparada sem piscadas.',
      nx12: 'O carrossel com scroll-snap nativo na vitrine "mais vendidos" encaixa slide a slide — navegação de produtos fluida até em celular fraco.',
      n11:  'O carrossel de fotos do produto com drag e inércia responde como app nativo — examinar todas as fotos vira gesto, não clique.',
      /* --- (b) micro-interações que guiam a compra --- */
      x01:  'O botão "adicionar ao carrinho" passa por enviando → check — o cliente tem certeza de que o item entrou, sem procurar confirmação.',
      x02:  'No checkout, o campo inválido sacode e fica vermelho na hora — o erro é apontado no lugar exato, antes de o cliente clicar em pagar de novo.',
      x03:  'Nos formulários de checkout, o label flutua ao digitar — o cliente nunca esquece o que aquele campo pedia no meio do preenchimento.',
      x05:  'O toggle com mola para opções tipo "embalagem presente" confirma o estado com física — ligado e desligado ficam inconfundíveis.',
      x06:  'O botão "copiar cupom" morfa para check — o cliente sabe que o código está na área de transferência sem testar colando.',
      x10:  'Ao adicionar ao carrinho, o item aparece na hora em estado "pendente" e confirma depois — a loja parece instantânea mesmo com rede lenta.',
      nx07: 'O badge do carrinho salta e pulsa quando um item entra — confirmação visual no canto da tela sem interromper a navegação.',
      nx08: 'O toast "produto adicionado" mostra a barra de tempo e pausa sob o mouse — o cliente decide com calma se vai ao carrinho ou continua comprando.',
      n08:  'Toasts de estoque, frete e cupom empilham e saem sozinhos — avisos da loja que informam sem exigir clique em "ok".',
      n07:  'O modal de tamanho/medidas abre com mola e fecha no ESC ou clique fora — consulta rápida sem tirar o cliente da página do produto.',
      nx04: 'O stepper do checkout preenche a linha e troca número por check a cada etapa — o cliente vê quanto falta para concluir e não abandona no meio.',
      l04:  'O skeleton shimmer segura o layout do grid enquanto os produtos carregam — a espera parece menor e nada "pula" quando a foto chega.',
      lx07: 'Cada tela (lista, produto, carrinho) tem esqueleto com a própria forma — o carregamento já anuncia o que vem, sem sensação de bug.',
      lx05: 'A barra fina no topo avança a cada navegação entre páginas da loja — o cliente sente que algo está acontecendo mesmo quando o servidor demora.',
      lx03: 'O card do produto "voa" e vira o header da página de detalhe — a transição contínua mantém o cliente ancorado no produto que escolheu.',
      lx01: 'A View Transitions API anima a troca de listagens (ex.: aplicar filtro) com um crossfade nativo — a loja inteira parece um app, não páginas soltas.',
      ex04: 'O blur-up (LQIP) mostra uma prévia desfocada até a foto do produto chegar — o grid nunca fica com buracos brancos em conexão lenta.',
      h08:  'No card de produto, a foto amplia dentro da moldura no hover — convite a "pegar o produto na mão" sem sair do grid.',
      qx02: 'As estrelas de avaliação preenchem por fração e saltam sob o cursor — avaliar (e ler avaliações) vira parte agradável da decisão.',
      qx06: 'Ao remover item do carrinho, o snackbar com timer circular oferece "desfazer" — o cliente age sem medo porque todo passo tem volta.',
      qx09: 'No pagamento, o cartão vira em 3D quando o foco entra no CVV — o formulário mostra onde fica o código e reduz erro na etapa mais sensível.',
      hx05: 'No carrinho mobile, arrastar o item para o lado o remove com colapso suave — gesto que o cliente já conhece dos apps, sem botão minúsculo de lixeira.'
    }
  },

  chales: {
    nome: 'Chalés & Hospedagem',
    desc: 'Atmosfera acolhedora e natureza: paisagens em parallax, partículas suaves, fotos que respiram.',
    itens: {
      s01:  'No hero, montanha, mata e névoa em camadas de parallax dão profundidade de paisagem real — o visitante "entra" no vale antes de ver os quartos.',
      s10:  'A foto aérea do chalé cresce e escurece devagar enquanto o texto sobe — abertura de documentário de viagem, convite imediato.',
      sx04: 'O parallax 3D em CSS puro nas fotos de trilha e lago cria profundidade sem nenhum script — leveza técnica combinando com a proposta do lugar.',
      sx10: 'Na galeria, uma coluna de fotos sobe e a outra desce com o scroll — o passeio pelas imagens fica contemplativo, como folhear um álbum.',
      a06:  'O smooth scroll com inércia deixa a navegação inteira lenta e macia — o ritmo do site já desacelera o visitante como a hospedagem promete.',
      s08:  'O texto sobre a experiência vai "acendendo" palavra a palavra conforme o scroll — leitura guiada no ritmo de uma conversa à beira da lareira.',
      s12:  'Entre as seções (chalés, gastronomia, trilhas), a cortina sobe trocando de cena — cada ambiente da pousada ganha sua própria paisagem.',
      sx05: 'A linha do SVG desenha o caminho da estrada até o chalé, acendendo paradas (cachoeira, mirante) — o mapa da chegada vira parte do encanto.',
      e05:  'Fotos e títulos entram de desfocado para nítido, como névoa da serra abrindo — cada seção "amanhece" na tela.',
      e03:  'Os títulos serifados sobem de dentro da máscara com calma — reveal elegante que combina com papelaria de pousada de charme.',
      e09:  'A frase de boas-vindas aparece palavra a palavra — o site "fala" devagar, no tom de quem recebe um hóspede.',
      ex04: 'O blur-up carrega as fotos de paisagem de prévia desfocada para nítida — até o carregamento parece a névoa da manhã se dissolvendo.',
      ex05: 'A máscara de gradiente revela o texto com borda esfumada — transição quente, sem nenhum corte duro que quebre o clima.',
      t07:  'O texto em círculo girando devagar vira o selo da pousada ("desde 1998 · serra · café da manhã") — artesanal como placa de madeira entalhada.',
      f01:  'O mesh gradient em tons de âmbar e verde ondula devaga ao fundo da seção de reservas — calor de fim de tarde sem custar uma imagem.',
      f05:  'A aurora em blur lento no fundo do hero noturno remete ao céu da montanha — atmosfera de noite estrelada sem clichê de foto de banco.',
      f06:  'O grain de filme sobre as fotos dá textura analógica de fotografia antiga — memória afetiva de álbum de família na serra.',
      f03:  'As partículas ligadas por linhas finas, em dourado sobre fundo escuro, viram vagalumes na seção noturna — o fundo respira sem distrair.',
      fx03: 'A neve caindo devagar no hero de inverno coloca o visitante dentro da estação — ninguém vende chalé de serra melhor que a própria neve.',
      fx07: 'O vídeo de fundo escurecido e recortado por máscara de gradiente deixa a lareira acesa atrás do texto — clima sem sacrificar leitura.',
      fx09: 'As curvas de nível se movendo lentamente ao fundo lembram o mapa da trilha — natureza desenhada, discreta, para a seção de passeios.',
      l03:  'O crossfade lento entre páginas troca de ambiente como quem caminha de um cômodo a outro — nunca um corte seco quebrando o clima.',
      hx01: 'Na seção de experiências, miniaturas de fotos surgem no rastro do cursor — flanar pelo site vira um passeio pelas memórias da hospedagem.',
      h08:  'Nos cards de acomodação, a foto amplia suavemente dentro da moldura — o hóspede "espia pela janela" de cada chalé.',
      h11:  'Sobre as fotos, o cursor vira o rótulo "ver chalé" — convite gentil ao clique, no lugar de botões gritando.'
    }
  },

  clinicas: {
    nome: 'Clínicas de alto padrão',
    desc: 'Elegância clínica e confiança: reveals suaves, números de credibilidade, agendamento sem fricção.',
    itens: {
      e01:  'Todos os blocos entram com fade + subida discreta — o site inteiro se move com a suavidade que o paciente espera encontrar na clínica.',
      e05:  'Fotos de resultados e títulos entram de desfocado para nítido — sensação de foco e precisão, a estética da própria especialidade.',
      e03:  'Os títulos sobem de dentro da máscara sem alarde — elegância contida que diferencia clínica premium de clínica popular.',
      e11:  'Na faixa de confiança, "procedimentos realizados" e "anos de experiência" contam do zero diante do paciente — credibilidade demonstrada, não declarada.',
      ex01: 'O odômetro rola os dígitos de pacientes atendidos com precisão de instrumento — a métrica ganha o acabamento do consultório.',
      e12:  'As barras de especialidades preenchem suavemente com o número junto — competência apresentada como dado, com sobriedade.',
      d02:  'O donut desenhando com contador no centro mostra índice de satisfação — o gráfico se completa como um tratamento bem-sucedido.',
      sx09: 'O anel de progresso discreto no canto acompanha a leitura das páginas longas de procedimentos — orientação sem nenhuma barra chamativa.',
      sx05: 'A linha do tempo desenha a jornada do tratamento (avaliação → plano → procedimento → acompanhamento), acendendo cada etapa — o paciente vê o caminho antes de agendar.',
      s02:  'O header encolhe e ganha leve blur ao rolar — o botão "agendar avaliação" fica sempre visível sem pesar sobre o conteúdo.',
      x01:  'O botão "agendar" passa por enviando → check desenhado — o paciente tem confirmação imediata de que a solicitação chegou.',
      x02:  'No formulário, o campo com erro sacode sutilmente e destaca a borda — a correção é apontada com delicadeza, sem mensagem agressiva.',
      x03:  'Os labels flutuam ao digitar no formulário de agendamento — preenchimento limpo e guiado, sem placeholder que some e confunde.',
      qx03: 'O código de confirmação do agendamento pula de campo em campo sozinho — a verificação por SMS fica tão cuidadosa quanto a recepção.',
      nx04: 'O agendamento em etapas (procedimento → data → dados) preenche a linha e marca checks — o paciente vê que faltam só dois passos e conclui.',
      n07:  'O modal de detalhes do procedimento abre com mola suave e fecha no ESC — informação a um clique, sem tirar o paciente da página.',
      n05:  'Nas abas de procedimentos (facial, corporal, injetáveis), o indicador desliza entre categorias — navegação de catálogo clínico sem recarregar nada.',
      n06:  'O FAQ de dúvidas pré-procedimento abre em acordeão fluido — o paciente resolve objeções na própria página, sem ligar para perguntar.',
      nx08: 'O toast "solicitação recebida, retornaremos em breve" com timer visível — o paciente sai do formulário sabendo exatamente o que acontece a seguir.',
      nx12: 'O carrossel com snap nativo exibe depoimentos de pacientes um a um — a prova social desfila com a mesma suavidade do resto do site.',
      qx02: 'As estrelas de avaliação preenchem por fração junto aos depoimentos — a nota real dos pacientes apresentada com refinamento.',
      l04:  'O skeleton shimmer segura o layout enquanto fotos de antes/depois carregam — nenhum "pulo" de página quebrando a sensação de cuidado.',
      l03:  'O crossfade suave entre as páginas de procedimentos — transições limpas que mantêm a calma do ambiente clínico na navegação.',
      lx01: 'A View Transitions API anima a troca de conteúdo com crossfade nativo — o site se comporta como um app premium, à altura da clínica.',
      lx03: 'O card do procedimento se expande e vira o header da página de detalhe — continuidade visual que mantém o paciente orientado.',
      ex04: 'O blur-up carrega os retratos da equipe de desfocado a nítido — nem o carregamento aparece "cru" para o paciente.',
      h03:  'O sublinhado que cresce suavemente nos links do menu — micro-acabamento tipográfico que sinaliza atenção ao detalhe em tudo.',
      hx09: 'Um único sublinhado viaja entre os itens do menu — navegação com fluidez de material impresso de alto padrão.'
    }
  }
};
