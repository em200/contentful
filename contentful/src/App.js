import { useState, useEffect } from 'react';
import './App.css';

const query = `
{
  pageCollection {
    items {
      title
    }
  }
}
`;

function App() {
	const [page, setPage] = useState(null);

	useEffect(() => {
		window
			.fetch(`https://graphql.contentful.com/content/v1/spaces/stpbbrn2sc7b/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Authenticate the request
					Authorization: 'Bearer wKsJV4sYkBW8W6oSol7ekEUbsP29x-5_0hBhYyeV9tg',
				},
				// send the GraphQL query
				body: JSON.stringify({ query }),
			})
			.then((response) => response.json())
			.then(({ data, errors }) => {
				if (errors) {
					console.error(errors);
				}

				// rerender the entire component with new data
				setPage(data.pageCollection.items[0]);
			});
	}, []);

	if (!page) {
		return 'Loading...';
	}

	return (
		<div className="App">
			<header className="App-header">{page.title}</header>
		</div>
	);
}

export default App;
