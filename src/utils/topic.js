export const checkTopicAuthorAvatar = (author) => {
    return author ? author.avatar_url : ""
}
export const checkTopicAuthorName = (author) => {
    return author ? author.loginname : ""
}