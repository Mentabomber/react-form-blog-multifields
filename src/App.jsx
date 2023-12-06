import { useState } from "react";
import TextInput from "./components/inputs/TextInput";

function App() {
  // const [email, setEmail] = useState("email_iniziale");
  // const [password, setPassword] = useState("");

  const initialFormData = {
    title: "Gita al mare",
    content: "Una bella gita al mare con Simone",
    privacy: false
  };

  const [postsList, setPostsList] = useState([]);
  const [formData, setFormData] = useState(initialFormData);

  function updateFormData(newValue, fieldName) {
    // clono l'oggetto formData
    // usiamo lo spread per eliminare qualsiasi riferimento allo state attuale, 
    // altrimenti avremmo un errore nel momento in cui cercheremo di modificare l'oggetto
    const newFormData = { ...formData };

    // aggiorno la chiave fieldName con il valore newValue
    newFormData[fieldName] = newValue;

    // passo l'oggetto modificato a setFormData
    setFormData(newFormData);

  }

  function handleFormSubmit(e) {
    // Evita il refresh della pagina come normalmente farebbe il form
    e.preventDefault();

    // Aggiungo l'utente alla lista usersList
    // Aggiorno lo state
    setPostsList([...postsList, {
      ...formData,
      id: crypto.randomUUID(),
      createAt: new Date(),
    }]);

    // Resetto il form
    setFormData(initialFormData);
  }

  function handleFormReset(e) {
    // Resetto il form
    setFormData(initialFormData);
  }

  function editPostTitle(idToEdit) {
    // Prompt the user for the new title
    const newTitle = prompt('Enter the new title:');
  
    if (newTitle) {
      // If the user entered a new title, update the postsList
      setPostsList(postsList.map((post) => {
        if (post.id === idToEdit) {
          return { ...post, title: newTitle };
        }
        return post;
      }));
    } else {
      // Handle the case where the user didn't enter a new title
      console.log('No new title entered. Post title remains unchanged.');
    }
  }

  function removePost(idToRemove) {
    // const newPostsList = [...PostsList]

    // newPostsList.splice(newPostsList.findIndex((Post) => Post.id === idToRemove), 1)

    setPostsList(postsList.filter((post) => post.id !== idToRemove));
  }

  return (
    <main>
      <div className="container mx-auto">
        <h1 className="text-4xl">Il tuo nuovo post</h1>

        <form className="flex flex-col gap-4 mx-auto py-8" onSubmit={handleFormSubmit} onReset={handleFormReset}>
          <TextInput name="title" placeholder="Post's title" label="Title" type="text"
            value={formData.title}
            onValueChange={(newValue) => updateFormData(newValue, 'title')}></TextInput>

          <TextInput name="content" placeholder="Post's content" label="Content"
            value={formData.content}
            onValueChange={(newValue) => updateFormData(newValue, 'content')}></TextInput>

          <TextInput name="privacy" label="Informativa privacy" type="checkbox"
            value={formData.privacy}
            onValueChange={(newValue) => updateFormData(newValue, 'privacy')}></TextInput>

          <div className="flex gap-6">
            <button className="px-4 py-3 bg-red-300 hover:bg-red-600"
              type="reset">Reset</button>

            <button className="px-4 py-3 bg-green-300 hover:bg-green-600"
            >Submit</button>
          </div>
        </form>

        <div className="border-t">
          <ul>
            {postsList.map((post) => (
              <li key={post.id} className="flex py-4 border-b">{post.title} - {post.content}
                <button className="p-5 w-6 h-6 flex items-center justify-center ml-auto bg-red-500 text-white font-bold"
                  onClick={() => editPostTitle(post.id)}>Edit</button>
                <button className="w-6 h-6 flex items-center justify-center ml-auto bg-red-500 text-white font-bold"
                  onClick={() => removePost(post.id)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;