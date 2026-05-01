type EditorUser = {
  id: string;
  name: string;
  email: string;
  password_set: boolean;
};

type Props = {
  editors: EditorUser[];
  loading: boolean;
  onDelete: (id: string) => void;
};

const EditorTable = ({ editors, loading, onDelete }: Props) => {
  if (loading) {
    return (
      <div className="card p-6 animate-pulse">
        <div className="h-4 bg-soft rounded mb-3"></div>
        <div className="h-4 bg-soft rounded mb-3"></div>
        <div className="h-4 bg-soft rounded"></div>
      </div>
    );
  }

  return (
    <div className="card px-4 overflow-hidden">
      <table className="w-full text-left">
        <thead className=" text-white">
          <tr>
            <th className="p-4">Name</th>
            <th>Email</th>
            <th>Password Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {editors.map((editor) => (
            <tr key={editor.id} className="border-main">
              <td className="p-4">{editor.name}</td>

              <td>{editor.email}</td>

              <td>
                {editor.password_set ? (
                  <span className="text-green-600">Password Set</span>
                ) : (
                  <span className="text-orange-500">Temporary Password</span>
                )}
              </td>

              <td>
                <button
                  onClick={() => {
                    onDelete(editor.id);
                  }}
                  className="btn-secondary px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditorTable;
