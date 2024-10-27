export const formatEmploymentType = (employment_type: string) => {
  switch (employment_type) {
    case "FT":
      return "Full-time";
    case "PT":
      return "Part-time";
    case "CT":
      return "Contract";
    case "IN":
      return "Internship";
  }
};
