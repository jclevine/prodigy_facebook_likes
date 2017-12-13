import { expect} from 'chai';
import { formatLikes, formatPosts } from '../src/facebook_likes';


describe('Facebook Formatting', () => {

  describe('Format Likes', () => {
    it('formats 0 likes properly', () => {
      const likes = [];
      const actual = formatLikes(likes);

      expect(actual).to.equal('No one likes this :(');
    });

    it('formats 1 like properly', () => {
      const likes = ['Saul'];
      const actual = formatLikes(likes);

      expect(actual).to.equal('Saul likes this');
    });

    it('formats 2 likes properly', () => {
      const likes = ['Saul', 'Walter'];
      const actual = formatLikes(likes);

      expect(actual).to.equal('Saul and Walter like this');
    });

    it('formats 3 likes properly', () => {
      const likes = ['Saul', 'Walter', 'Mike'];
      const actual = formatLikes(likes);

      expect(actual).to.equal('Saul, Walter and Mike like this');
    });

    it('formats 4 likes properly', () => {
      const likes = ['Saul', 'Walter', 'Mike', 'Skyler'];
      const actual = formatLikes(likes);

      expect(actual).to.equal('Saul, Walter and 2 others like this');
    });

    it('formats 10 likes properly', () => {
      const likes = ['Saul', 'Walter', 'Mike', 'Skyler', 'Jesse', 'Gus', 'Hank', 'Jane', 'Skinny Pete', 'Jane'];
      const actual = formatLikes(likes);

      expect(actual).to.equal('Saul, Walter and 8 others like this');
    });

    it('ignores non-string "people"', () => {
      const likes = ['Saul', true, 'Mike', 'Skyler', 'Jesse', null, 'Hank', 'Jane', 'Skinny Pete', undefined];
      const actual = formatLikes(likes);

      expect(actual).to.equal('Saul, Mike and 5 others like this');
    });

    it('raises error if the input is invalid', () => {
      const likes = { what: 'is this' };
      expect(() => formatLikes(likes)).to.throw(Error, `Unexpected input: ${JSON.stringify(likes)}`);
    });
  });

  describe('Format Posts', () => {
    it('formats posts properly', () => {
      const posts = [
        {id: 1, likes: []},
        {id: 2, likes: ['Peter']},
        {id: 3, likes: ['John', 'Mark']},
        {id: 4, likes: ['Paul', 'Lilly', 'Alex']},
        {id: 5, likes: ['Sarah', 'Michelle', 'Alex', 'John']},
        {id: 6, likes: ['Sarah', 'Michelle', null, 'John']}
      ];

      const actual = formatPosts(posts);

      expect(actual).to.be.deep.equal([
        {id: 1, text: 'No one likes this :('},
        {id: 2, text: 'Peter likes this'},
        {id: 3, text: 'John and Mark like this'},
        {id: 4, text: 'Paul, Lilly and Alex like this'},
        {id: 5, text: 'Sarah, Michelle and 2 others like this'},
        {id: 6, text: 'Sarah, Michelle and John like this'}
      ]);
    });
  });
});
