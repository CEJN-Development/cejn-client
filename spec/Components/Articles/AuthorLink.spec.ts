import { render, screen } from '@testing-library/svelte';
import AuthorLink from '$lib/components/Articles/AuthorLink.svelte';
import type { Writer } from '$lib/types/Writers';

const author: Writer = {
	byline: 'author description',
	created_at: new Date(),
	id: 1,
	full_name: 'Author Name',
	slug: 'author-name',
	updated_at: new Date()
};

describe('AuthorLink', () => {
	describe('with an author', () => {
		const props = {
			author,
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

		it("does not add comma after the author's name", () => {
			const { getByText } = render(AuthorLink, { props });

			expect(getByText('Author Name')).toBeInTheDocument();
			expect(screen.queryByText(',')).not.toBeInTheDocument();
		});

		describe('when there are more authors', () => {
			beforeEach(() => {
				props.end = false;
			});

			it("adds comma after the author's name", () => {
				const { getByText } = render(AuthorLink, { props });

				expect(getByText('Author Name')).toBeInTheDocument();
				expect(getByText(',')).toBeInTheDocument();
			});
		});
	});
});
