export const formatLikes = (likes) => {
  validateLikes(likes);

  const filteredLikes = likes.filter(filterUnexpectedLikes);
  
  switch (filteredLikes.length) {
    case 0:
      return 'No one likes this :(';
    case 1:
      return `${filteredLikes[0]} likes this`;
    case 2:
      return `${filteredLikes[0]} and ${filteredLikes[1]} like this`;
    case 3:
      return `${filteredLikes[0]}, ${filteredLikes[1]} and ${filteredLikes[2]} like this`;
    default:
      return `${filteredLikes[0]}, ${filteredLikes[1]} and ${filteredLikes.length - 2} others like this`
  }
};

const validateLikes = likes => {
  if (!Array.isArray(likes)) {
    throw new Error(`Unexpected input: ${JSON.stringify(likes)}`);
  }
};

const filterUnexpectedLikes = like => {
  const shouldFilter = typeof like !== 'string';
  if (shouldFilter) {
    console.warn(`Unexpected like: ${like}`);
    return false;
  } else {
    return true;
  }
};

export const formatPosts = posts => posts.map(transformPosts);

const transformPosts = post => {
  return {
    id: post.id,
    text: formatLikes(post.likes)
  };
};

