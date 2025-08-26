
export const categories = [
    { id: 'todos', name: 'Todos', icon: '🍽️' },
    { id: 'acai', name: 'Açaí', icon: '🍧' },
    { id: 'salgados', name: 'Salgados', icon: '🥐' },
    { id: 'bebidas', name: 'Bebidas', icon: '🥤' }
];

export const menuItems = [
  {
    id: 1,
    name: 'Açaí Tradicional',
    description: 'Açaí puro batido com banana, xarope de guaraná e frutas.',
    price: 15.90,
    category: 'acai',
    image: 'Açaí bowl with bananas and granola',
    images: [
      'Açaí bowl with bananas and granola',
      'Close up of açaí texture',
      'Açaí with various fruit toppings'
    ],
    rating: 4.8,
    prepTime: '5-10 min',
    tags: ['Popular', 'Vegano'],
    link_pagamento_online: '',
    customization: [
      {
        title: 'Escolha o Tamanho',
        type: 'radio',
        required: true,
        options: [
          { name: '300ml', price: 0 },
          { name: '500ml', price: 4.00 },
          { name: '700ml', price: 8.00 },
        ]
      },
      {
        title: 'Adicione Frutas (Até 3)',
        type: 'checkbox',
        max: 3,
        options: [
          { name: 'Banana', price: 2.00 },
          { name: 'Morango', price: 3.00 },
          { name: 'Manga', price: 2.50 },
          { name: 'Kiwi', price: 3.50 },
        ]
      },
      {
        title: 'Escolha sua Calda',
        type: 'radio',
        options: [
          { name: 'Nenhuma', price: 0 },
          { name: 'Leite Condensado', price: 2.00 },
          { name: 'Chocolate', price: 2.00 },
          { name: 'Morango', price: 2.00 },
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Coxinha de Frango',
    description: 'Salgado frito recheado com frango desfiado e catupiry.',
    price: 7.50,
    category: 'salgados',
    image: 'Golden brown Brazilian coxinha',
    images: [
      'Golden brown Brazilian coxinha',
      'Coxinha cut in half showing filling'
    ],
    rating: 4.9,
    prepTime: '10-15 min',
    tags: ['Popular'],
    link_pagamento_online: '',
  },
  {
    id: 3,
    name: 'Coca-Cola Lata',
    description: 'Lata de 350ml de Coca-Cola gelada.',
    price: 5.00,
    category: 'bebidas',
    image: 'Can of Coca-Cola with ice',
    images: ['Can of Coca-Cola with ice'],
    rating: 4.7,
    prepTime: '1 min',
    link_pagamento_online: '',
  },
  {
    id: 4,
    name: 'Suco de Laranja Natural',
    description: 'Copo de 500ml de suco de laranja feito na hora.',
    price: 8.50,
    category: 'bebidas',
    image: 'Glass of fresh orange juice',
    images: ['Glass of fresh orange juice'],
    rating: 4.8,
    prepTime: '5 min',
    tags: ['Saudável'],
    link_pagamento_online: '',
  },
  {
    id: 5,
    name: 'Pastel de Carne',
    description: 'Pastel frito recheado com carne moída temperada.',
    price: 8.00,
    category: 'salgados',
    image: 'Crispy Brazilian pastel',
    images: ['Crispy Brazilian pastel'],
    rating: 4.6,
    prepTime: '10-15 min',
    link_pagamento_online: '',
  },
  {
    id: 6,
    name: 'Açaí com Cupuaçu',
    description: 'Metade açaí, metade creme de cupuaçu.',
    price: 18.90,
    category: 'acai',
    image: 'Açaí and cupuaçu swirl in a bowl',
    images: ['Açaí and cupuaçu swirl in a bowl'],
    rating: 4.7,
    prepTime: '5-10 min',
    link_pagamento_online: '',
    customization: [
      {
        title: 'Escolha o Tamanho',
        type: 'radio',
        required: true,
        options: [
          { name: '300ml', price: 0 },
          { name: '500ml', price: 4.00 },
        ]
      },
      {
        title: 'Adicionais',
        type: 'checkbox',
        options: [
          { name: 'Leite em Pó', price: 2.50 },
          { name: 'Paçoca', price: 2.00 },
        ]
      }
    ]
  },
];
