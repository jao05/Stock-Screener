const IEX_ENDPOINT = 'https://api.iextrading.com/1.0/stock/FB/book';

function handleRunStockScreener()
{
	$( '#searchForm' ).on( 'submit', function( event )
		{
			event.preventDefault();
			let searchItem = $(event.currentTarget).find('#searchInput').val();
			console.log( searchItem );

			const QUERY = { symbol: 'FB' }

			$.getJSON(IEX_ENDPOINT, displayResultsPage);
		} );
}

function displayResultsPage(data)
{
	console.log(data);
}

/*
FUNCTION STUBS

displayStartPage()
{
   // Renders start page
   // Allows user to input company name or stock ticker symbol for search
   // Listens to submit button
   // Calls makeRequest(), passing in user's search item as parameter
   
}


makeRequest()
{
   // Creates query object
   // Makes a request to the endpoint for data about the search company 
   // Calls displayResults(), passing in response as parameter
}


displayResultsPage()
{
   // Hide startPage
   // Makes response visible by displaying the results page
   // Calls renderResults, passing response as parameter
   // ***IS THIS THE PLACE FOR THE "DELETE" and "ADD COMPARABLE" BUTTONS*****
   // Calls renderResults()
}


renderResults()
{
   // Calls createHtmlStrings()
   // Add HTML strings to the DOM
}


createHtmlStrings()
{
   // Creates the HTML strings needed to display results
}



deleteCompany()
{
   // Listens for click on "Delete Company Button"
   // Removes selected company from the display page
}


addComparableComps()
{
   // Listens for click on "Add Comparable Button"
   // Calls getComparables
   // Calls makeRequest(), passing in comparable companies as parameters
}


getComparables()
{
   // Returns a list of two (2) or three (3) comparable companies
   // Makes a request for comparable companies
}


makeReccomendation()
{
   // Creates ranking criteria for displayed companies using "secret algorithm"
   // Selects recommended company
   // Makes user aware of recommended company
   // Prompt user to buy
   // If user selects 'yes', call makePurchase()
   // else (if user selects 'no') prompt user to search again
}

makePurchase()
{
   // Ask user for available funds
   // Get current price of stock
   // Show user how many shares they can afford to purchase
   // Call displayBrokers
}

displayBrokers()
{
  // Output: "Visit one of these sites to place your order"
  // Provide linked photos of at least 3 brokers
}
*/

$( handleRunStockScreener )