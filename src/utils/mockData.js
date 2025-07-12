export const MOCK_QUESTIONS = [
  {
    id: 1,
    title: "How to join 2 columns in a data set to make a separate column in SQL",
    description: "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name and column 2 consists of last name I want a column to combine ...",
    username: "SQLLearner",
    tags: ["sql", "database", "mysql"],
    timeAgo: "5 mins",
    answers: 2,
    category: "question"
  },
  {
    id: 9,
    title: "How to concatenate first and last name in SQL Server?",
    description: "I want to display full names by combining first and last name columns in SQL Server. What's the best way?",
    username: "DBBeginner",
    tags: ["sql", "database", "sql-server"],
    timeAgo: "10 mins",
    answers: 1,
    category: "question"
  },
  {
    id: 10,
    title: "Combine columns in MySQL for reporting",
    description: "For reporting purposes, I need to merge two columns into one in MySQL. Is there a function for this?",
    username: "ReportGuy",
    tags: ["sql", "mysql", "database"],
    timeAgo: "20 mins",
    answers: 2,
    category: "question"
  },
  {
    id: 11,
    title: "How to use CONCAT_WS in SQL for multiple columns?",
    description: "Can someone explain how CONCAT_WS works in SQL and when to use it for joining columns?",
    username: "ConcatFan",
    tags: ["sql", "database", "concat"],
    timeAgo: "25 mins",
    answers: 3,
    category: "question"
  },
  {
    id: 12,
    title: "Best way to join columns in PostgreSQL?",
    description: "Is there a recommended way to join columns in PostgreSQL for creating a full name field?",
    username: "PostgresPro",
    tags: ["sql", "database", "postgresql"],
    timeAgo: "30 mins",
    answers: 2,
    category: "question"
  },
  {
    id: 13,
    title: "How to merge columns in SQLite?",
    description: "Trying to merge two columns in SQLite. Is there a built-in function for this?",
    username: "LiteUser",
    tags: ["sql", "database", "sqlite"],
    timeAgo: "35 mins",
    answers: 1,
    category: "question"
  },
  {
    id: 2,
    title: "React useEffect not working as expected with dependencies",
    description: "I'm trying to implement a side effect in my React component that should run whenever certain props change, but I'm running into an infinite loop issue...",
    username: "ReactDev",
    tags: ["javascript", "react", "hooks"],
    timeAgo: "15 mins",
    answers: 5,
    category: "question"
  },
  {
    id: 3,
    title: "Best practices for Node.js error handling",
    description: "Looking for comprehensive guide on error handling patterns in Node.js applications. Specifically interested in handling async errors and creating custom error classes...",
    username: "NodeMaster",
    tags: ["javascript", "node.js", "error-handling"],
    timeAgo: "1 hour",
    answers: 3,
    category: "discussion"
  },
  {
    id: 4,
    title: "Python pandas DataFrame groupby and aggregate",
    description: "Working with a large dataset and need to perform complex grouping operations. Looking for efficient ways to group by multiple columns and apply different aggregations...",
    username: "DataScientist",
    tags: ["python", "pandas", "data-science"],
    timeAgo: "2 hours",
    answers: 1,
    category: "question"
  },
  {
    id: 5,
    title: "Understanding Docker networking between containers",
    description: "Need help understanding how to properly set up networking between Docker containers. Trying to connect a Node.js app with MongoDB and Redis containers...",
    username: "DevOpsEngineer",
    tags: ["docker", "networking", "devops"],
    timeAgo: "3 hours",
    answers: 4,
    category: "question"
  },
  {
    id: 6,
    title: "Implementing OAuth2 authentication in a React application",
    description: "Looking for guidance on implementing OAuth2 authentication flow in a React application. Specifically need help with handling tokens and refresh flows.",
    username: "SecurityExpert",
    tags: ["react", "oauth2", "authentication"],
    timeAgo: "4 hours",
    answers: 2,
    category: "question"
  },
  {
    id: 7,
    title: "Best practices for optimizing React application performance",
    description: "Working on a large React application and noticing some performance issues. Looking for best practices regarding memo, useCallback, and other optimization techniques.",
    username: "ReactOptimizer",
    tags: ["react", "performance", "optimization"],
    timeAgo: "5 hours",
    answers: 6,
    category: "article"
  },
  {
    id: 8,
    title: "Understanding TypeScript generics and utility types",
    description: "Need help understanding how to effectively use TypeScript generics and built-in utility types like Partial, Pick, etc.",
    username: "TypeScriptLearner",
    tags: ["typescript", "javascript", "generics"],
    timeAgo: "6 hours",
    answers: 3,
    category: "tutorial"
  }
];

// Update POPULAR_TAGS with more relevant tags
export const POPULAR_TAGS = [
  { name: "javascript", count: 1234 },
  { name: "python", count: 987 },
  { name: "react", count: 856 },
  { name: "node.js", count: 754 },
  { name: "sql", count: 652 },
  { name: "docker", count: 543 },
  { name: "aws", count: 432 },
  { name: "git", count: 321 },
  { name: "typescript", count: 789 },
  { name: "angular", count: 678 },
  { name: "vue", count: 567 },
  { name: "database", count: 456 },
  { name: "mongodb", count: 345 },
  { name: "api", count: 234 },
  { name: "testing", count: 123 }
];

// Update CATEGORIES with more specific categories
export const CATEGORIES = [
  { value: "question", label: "Question" },
  { value: "article", label: "Article" },
  { value: "tutorial", label: "Tutorial" },
  { value: "discussion", label: "Discussion" },
  { value: "resource", label: "Resource" },
  { value: "tool", label: "Tool/Library" },
  { value: "best-practice", label: "Best Practice" },
  { value: "bug", label: "Bug Report" },
  { value: "feature", label: "Feature Request" }
];

export const filterQuestions = (questions, filter) => {
  switch (filter) {
    case 'Newest':
      return [...questions].sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));
    case 'Unanswered':
      return questions.filter(q => q.answers === 0);
    case 'Active':
      return [...questions].sort((a, b) => b.answers - a.answers);
    case 'Votes':
      return [...questions].sort((a, b) => (b.votes || 0) - (a.votes || 0));
    default:
      return questions;
  }
};

export const searchQuestions = (questions, searchTerm) => {
  if (!searchTerm) return questions;
  const lowercaseSearch = searchTerm.toLowerCase();
  return questions.filter(question =>
    question.title.toLowerCase().includes(lowercaseSearch) ||
    question.description.toLowerCase().includes(lowercaseSearch) ||
    question.tags.some(tag => tag.toLowerCase().includes(lowercaseSearch))
  );
};

// Utility Functions
export function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// Update formatMarkdown to use smart markdown formatting
export const formatMarkdown = (text, command) => {
    const commands = {
        bold: { prefix: '**', suffix: '**' },
        italic: { prefix: '_', suffix: '_' },
        strikethrough: { prefix: '~~', suffix: '~~' },
        bullet: { prefix: '- ', suffix: '\n' },
        number: { prefix: '1. ', suffix: '\n' },
        code: { prefix: '```\n', suffix: '\n```' },
        link: { prefix: '[', middle: '](', suffix: ')' },
        image: { prefix: '![', middle: '](', suffix: ')' },
        align_left: { prefix: '<div style="text-align: left">\n', suffix: '\n</div>' },
        align_center: { prefix: '<div style="text-align: center">\n', suffix: '\n</div>' },
        align_right: { prefix: '<div style="text-align: right">\n', suffix: '\n</div>' }
    };

    const textArea = document.getElementById('content');
    if (!textArea) return null;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = textArea.value.substring(start, end);
    const cmd = commands[command];
    let newText;

    switch (command) {
        case 'link':
        case 'image': {
            const url = prompt('Enter URL:');
            if (!url) return null;
            const text = selectedText || (command === 'image' ? 'alt text' : 'link text');
            newText = cmd.prefix + text + cmd.middle + url + cmd.suffix;
            break;
        }

        case 'bullet':
        case 'number':
            if (selectedText) {
                const lines = selectedText.split('\n');
                newText = lines
                    .map((line, i) => command === 'number' ? `${i + 1}. ${line}` : `- ${line}`)
                    .join('\n');
            } else {
                newText = cmd.prefix;
            }
            break;

        case 'code':
            if (selectedText.includes('\n')) {
                newText = '```\n' + selectedText + '\n```';
            } else {
                newText = '`' + (selectedText || 'code') + '`';
            }
            break;

        case 'align_left':
        case 'align_center':
        case 'align_right':
            newText = cmd.prefix + (selectedText || 'text') + cmd.suffix;
            break;

        default:
            newText = cmd.prefix + (selectedText || '') + cmd.suffix;
    }

    return {
        newText,
        start,
        end: start + newText.length
    };
};

// Emoji categories and list for rich text editor
export const EMOJI_CATEGORIES = {
    smileys: {
        name: "Smileys & People",
        emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "🤓", "🤔", "🤨", "😐", "😑", "😶", "🙄", "😏", "😣", "😥", "😮", "🤐", "😯", "😪", "😫", "🥱", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓", "😔", "😕", "🙃", "🤑", "😲", "☹️", "🙁", "😖", "😞", "😟", "😤", "😢", "😭", "😦", "😧", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳", "🤪", "😵", "🥴", "😠", "😡", "🤬", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "😇", "🥳", "🥺", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓"]
    },
    nature: {
        name: "Animals & Nature", 
        emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽", "🐸", "🐵", "🙈", "🙉", "🙊", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣", "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🕸️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"]
    },
    food: {
        name: "Food & Drink",
        emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🦴", "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘", "🫕", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛", "🍼", "☕", "🍵", "🧃", "🥤", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧉", "🍾"]
    },
    objects: {
        name: "Objects",
        emojis: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎", "⚖️", "🪜", "🧰", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🔩", "⚙️", "🪚", "🔫", "🧨", "💣", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🪦", "⚱️", "🏺", "🔮", "📿", "🧿", "💈", "⚗️", "🔭", "🔬", "🕳️", "🩹", "🩺", "💊", "💉", "🩸", "🧬", "🦠", "🧫", "🧪", "🌡️", "🧹", "🪠", "🧽", "🧴", "🛎️", "🔑", "🗝️", "🚪", "🪑", "🛋️", "🛏️", "🛌", "🧸", "🪆", "🖼️", "🪟", "🪜"]
    },
    symbols: {
        name: "Symbols",
        emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🛗", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"]
    },
    flags: {
        name: "Flags",
        emojis: ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫", "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲", "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇩🇪", "🇩🇬", "🇩🇯", "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺", "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷", "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭", "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇭🇰", "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶", "🇮🇷", "🇮🇸", "🇮🇹", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵", "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳", "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹", "🇱🇺", "🇱🇻", "🇱🇾", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲", "🇲🇳", "🇲🇴", "🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺", "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿", "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇴🇲", "🇵🇦", "🇵🇪", "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼", "🇵🇾", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇸🇦", "🇸🇧", "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬", "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽", "🇸🇾", "🇸🇿", "🇹🇦", "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳", "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿", "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇼🇫", "🇼🇸", "🇽🇰", "🇾🇪", "🇾🇹", "🇿🇦", "🇿🇲", "🇿🇼"]
    }
};

// Function to insert emoji into text editor
export const insertEmoji = (emoji, textAreaRef, setFormData) => {
    if (!textAreaRef.current) return;
    
    const textarea = textAreaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const before = text.substring(0, start);
    const after = text.substring(end);
    
    setFormData(prev => ({
        ...prev,
        content: before + emoji + after
    }));
    
    setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + emoji.length, start + emoji.length);
    }, 0);
};

export const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export function validateQuestion(formData) {
    const errors = {};
    
    if (!formData.title.trim()) {
        errors.title = 'Title is required';
    } else if (formData.title.length < 15) {
        errors.title = 'Title must be at least 15 characters';
    } else if (formData.title.length > 150) {
        errors.title = 'Title must not exceed 150 characters';
    }
    
    if (!formData.content.trim()) {
        errors.content = 'Content is required';
    } else if (formData.content.length < 30) {
        errors.content = 'Content must be at least 30 characters';
    }
    
    if (!formData.category) {
        errors.category = 'Category is required';
    }
    
    if (formData.tags && !formData.tags.split(',').some(tag => tag.trim())) {
        errors.tags = 'At least one valid tag is required';
    }
    
    return errors;
}
