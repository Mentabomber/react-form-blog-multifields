import { useEffect, useState } from "react";
import TextInput from "./inputs/TextInput";

export default function PostEditDialog({ show, handleCancel, handleSubmit, formData }) {
  const [internalData, setInternalData] = useState({ ...formData });

  // Ogni volta che la prop formData cambia,
  // aggiorno lo state interno di internalData
  useEffect(() => {
    setInternalData({ ...formData });
  }, [formData])

  /**
   * Riceve il nuovo valore da assegnare 
   * alla chiave fieldName sull'oggetto formData
   * 
   * @param {string} newValue 
   * @param {string} fieldName 
   */
  function updateFormData(newValue, fieldName) {
    setInternalData({
      ...internalData,
      [fieldName]: newValue,
    });
  }

  function handleInternalSubmit(e) {
    e.preventDefault();
    handleSubmit(internalData);
  }


  return (
    <div className={'fixed inset-0 flex items-center justify-center bg-black/50 ' + (!show ? 'hidden' : '')}>

      {/* finestra dialog */}
      <div className="w-96 max-h-screen bg-white shadow-2xl">

        {/* titolo */}
        <div className="border-b px-4 py-3 text-xl">Modifica Post</div>

        {/* body */}
        <div className="px-4 py-3">
          <form className="flex flex-col gap-4 mx-auto py-8" id="user-edit-form"
            onSubmit={handleInternalSubmit}
            onReset={() => handleCancel()}>
            <TextInput name="title" placeholder="Titolo del post" label="Titolo Post" type="text"
              value={internalData.title ?? ''}
              onValueChange={(newValue) => updateFormData(newValue, 'title')}></TextInput>

            <TextInput name="content" placeholder="Contenuto del post" label="Contenuto post"
              value={internalData.content ?? ''}
              onValueChange={(newValue) => updateFormData(newValue, 'content')}></TextInput>

            <TextInput name="published" label="Publicato" type="checkbox"
              value={internalData.published ?? ''}
              onValueChange={(newValue) => updateFormData(newValue, 'privacy')}></TextInput>

            <TextInput name="image" label="Immagine" type="file"
              value={internalData.published ?? ''}
              onValueChange={(newValue) => updateFormData(newValue, 'file')}></TextInput>
          </form>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-4 px-4 py-3 border-t">
          <button className="px-4 py-3 bg-red-300 hover:bg-red-600"
            type="reset" form="user-edit-form">Annulla</button>

          <button className="px-4 py-3 bg-green-300 hover:bg-green-600"
            type="submit" form="user-edit-form">Salva</button>
        </div>
      </div>
    </div>
  );
}