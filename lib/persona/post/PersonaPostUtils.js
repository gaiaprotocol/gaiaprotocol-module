class PersonaPostUtils {
    convertPersonaPostToSocialPost(personaPost) {
        return {
            id: personaPost.id.toString(),
            author: personaPost.persona_owner,
            title: personaPost.title,
            content: personaPost.content,
            rich: personaPost.rich,
            reactions: personaPost.reactions,
            createdAt: personaPost.created_at,
            editedAt: personaPost.edited_at,
        };
    }
}
export default new PersonaPostUtils();
//# sourceMappingURL=PersonaPostUtils.js.map