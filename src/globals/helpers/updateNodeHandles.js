const updateNodeHandles = (name, value, self,elements) => {
  const updatedElements = elements.map((els) => {
    if (els.id === self.id) {
      return {
        ...els,
        data: {
          ...els.data,
          [name]: Number(value),
        },
      };
    } else {
      return els;
    }
  });
  return updatedElements;
};

export default updateNodeHandles;