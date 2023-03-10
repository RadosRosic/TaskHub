const NewEmployee = () => {
  return <EmployeeForm />;
};

export default NewEmployee;

export const editEmployee = async () => {
  const response = await fetch(
    "https://6409c70ed16b1f3ed6dc8caf.mockapi.io/taskhub/employees",
    {
      method: "POST",
    }
  );
};
