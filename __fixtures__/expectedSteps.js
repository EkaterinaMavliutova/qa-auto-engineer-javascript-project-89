export default [
  {
    id: 'welcome',
    messages: [
      'Hello! Virtual helper of the "Purrrfect" e-shop is at your servise). Click "Start conversation" to open a chat.',
    ],
    buttons: [
      {
        text: 'Start conversation',
        nextStepId: 'check',
        type: "button",
      },
    ],
  },
  {
    id: 'check',
    messages: [
      'I\'ll help you to choose the best food for your awesome cat) But first let me check what kind of person you are.',
      'Please answer this question: "Which cat breed is the cutest?"',
    ],
    buttons: [
      {
        text: 'Bengal',
        nextStepId: 'start',
        type: "button",
      },
      {
        text: 'Scottish Fold',
        nextStepId: 'start',
        type: "button",
      },
      {
        text: 'Sphynx',
        nextStepId: 'start',
        type: "button",
      },
      {
        text: 'I don\'t like cats',
        nextStepId: 'finish',
        type: "button",
      },
      {
        text: 'Tabby',
        nextStepId: 'start',
        type: "button",
      },
    ],
  },
  {
    id: 'start',
    messages: [
      'Awesome-Pawsome! Let\'s start) Select what kind of food your cat prefers.',
    ],
    buttons: [
      {
        text: 'Dry',
        nextStepId: 'dry',
        type: "button",
      },
      {
        text: 'Wet',
        nextStepId: 'wet',
        type: "button",
      },
      {
        text: 'Dry and wet combination',
        nextStepId: 'dryWet',
        type: "button",
      },
    ],
  },
  {
    id: 'dry',
    messages: [
      'Purrfect! Now select the main goal.',
    ],
    buttons: [
      {
        text: 'Something tasty',
        nextStepId: 'tasty',
        type: "button",
      },
      {
        text: 'Something nutritious',
        nextStepId: 'nutritious',
        type: "button",
      },
      {
        text: 'Return',
        nextStepId: 'start',
        type: "button",
      },
    ],
  },
  {
    id: 'wet',
    messages: [
      'Great choice! Now select the flavour.',
    ],
    buttons: [
      {
        text: 'Fish',
        nextStepId: 'fish',
        type: "button",
      },
      {
        text: 'Turkey',
        nextStepId: 'turkey',
        type: "button",
      },
      {
        text: 'Return',
        nextStepId: 'start',
        type: "button",
      },
    ],
  },
  {
    id: 'dryWet',
    messages: [
      'In that case you need to choose each kind separetly. Please, return and select either "Dry" or "Wet".',
    ],
    buttons: [
      {
        text: 'Return',
        nextStepId: 'start',
        type: "button",
      },
    ],
  },
  {
    id: 'tasty',
    messages: [
      'Your fur rascal must be a picky eater) Try one of these irresistible variants then:',
      '- Royal Canin: Savor Selective',
      '- Farmina N&D: Chicken & Pomegranate Adult',
    ],
    buttons: [
      {
        text: 'How to order',
        nextStepId: 'order',
        type: "button",
      },
      {
        text: 'Return',
        nextStepId: 'dry',
        type: "button",
      },
    ],
  },
  {
    id: 'nutritious',
    messages: [
      'Each of these variants packed with nutrients and provide your cat with energy for the long busy day:',
      'Royal Canin: Gastrointestinal',
      'Hills: Energy',
    ],
    buttons: [
      {
        text: 'How to order',
        nextStepId: 'order',
        type: "button",
      },
      {
        text: 'Return',
        nextStepId: 'dry',
        type: "button",
      },
    ],
  },
  {
    id: 'fish',
    messages: [
      'What cat refuse to feast on tasty fish dish) Try one of these variants:',
      '- Royal Canin: Fansy Tuna',
      '- Farmina N&D: Natural Tuna & Salmon',
    ],
    buttons: [
      {
        text: 'How to order',
        nextStepId: 'order',
        type: "button",
      },
      {
        text: 'Return',
        nextStepId: 'wet',
        type: "button",
      },
    ],
  },
  {
    id: 'turkey',
    messages: [
      'Your fur rascal must be picky eater) Try one of these irresistible variants then:',
      '- Royal Canin: Tasty Turkey',
      '- Farmina N&D: Turkey & Pomegranate Adult',
    ],
    buttons: [
      {
        text: 'How to order',
        nextStepId: 'order',
        type: "button",
      },
      {
        text: 'Return',
        nextStepId: 'wet',
        type: "button",
      },
    ],
  },
  {
    id: 'welcome',
    messages: [
      '',
    ],
    buttons: [
      {
        text: 'Start conversation',
        nextStepId: 'check',
        type: "button",
      },
    ],
  },
  {
    id: 'finish',
    messages: [
      'Wrong answer! Let\'s try again!',
    ],
    buttons: [
      {
        text: 'Try again',
        nextStepId: 'check',
        type: "button",
      },
    ],
  },
  {
    id: 'order',
    messages: [
      'You can order cat food you\'ve chose via "Purrrfect" e-shop or buy it offline in one of our stores.',
      '',
      'Thank you for entrusting us to choose the best food for you cat)',
      'This is a promo-code you can use to get a 10% discount)',
      'PURRRSOME',
    ],
    buttons: [
      {
        text: 'To the beginning',
        nextStepId: 'welcome',
        type: "button",
      }
    ],
  }
];
