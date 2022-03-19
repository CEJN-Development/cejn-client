import { render } from '@testing-library/svelte';
import AuthorLink from '$lib/components/Articles/AuthorLink.svelte';

it('Welcome the user', () => {
  const props = { 
    end: true,
    author: { slug: 'author-name', full_name: 'Author Name'}
   };
	const { getByText } = render(AuthorLink, { props });
  
  expect(getByText('Author Name')).toBeInTheDocument();
});
