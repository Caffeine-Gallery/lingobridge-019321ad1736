export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'translate' : IDL.Func([IDL.Text, IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
