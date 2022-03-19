import { render } from '@testing-library/svelte';
import AuthorLink from '$lib/components/Articles/AuthorLink.svelte';

describe('AuthorLink', () => {
	describe('with an author', () => {
		const props = {
			author: { slug: 'author-name', full_name: 'Author Name' },
			end: true
		};

		it('renders the correct author name', () => {
			const { getByText } = render(AuthorLink, { props });

			expect(getByText('Author Name')).toBeInTheDocument();
		});

		it('links to the correct path', () => {
			const { getByText } = render(AuthorLink, { props });
			const authorLink = <HTMLAnchorElement>getByText('Author Name');

			expect(authorLink.pathname).toEqual('/writers/author-name');
		});
	});
});
