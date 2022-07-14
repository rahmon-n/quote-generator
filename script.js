let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');
const tweetBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function newQuote() {
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  quoteText.textContent = quote.text;

  complete();

  if (!quote.author) {
    quoteAuthor.textContent = 'Unknown';
  } else {
    quoteAuthor.textContent = quote.author;
  }

  if (quote.text.length > 80) {
    quoteText.parentElement.classList.add('long-quote');
  } else {
    quoteText.parentElement.classList.remove('long-quote');
  }
}

async function getQuotes() {
  const apiUrl = 'https://type.fit/api/quotes';

  loading();

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, '_blank');
}

// On Load
getQuotes();

// Event Listeners
tweetBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);
