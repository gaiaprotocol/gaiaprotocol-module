import { Post } from "@common-module/social-components";
import PersonaPostEntity from "./PersonaPostEntity.js";

class PersonaPostUtils {
  public convertPersonaPostToSocialPost(personaPost: PersonaPostEntity): Post {
    return {
      id: personaPost.id.toString(),
      author: personaPost.author,

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
