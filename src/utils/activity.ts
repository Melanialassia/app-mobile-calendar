export const getUrgencyBadgeStyle = (urgency: "Alta" | "Media" | "Baja") => {
  const stylesMap = {
    Alta: {
      backgroundColor: "#FCA5A5",
      borderColor: "#F87171", 
      textColor: "#F87171", 
    },
    Media: {
      backgroundColor: "#FEF3C7", 
      borderColor: "#F59E0B", 
      textColor: "#F59E0B",
    },
    Baja: {
      backgroundColor: "#D1FAE5", 
      borderColor: "#34D399", 
      textColor: "#34D399",
    },
  };
  return stylesMap[urgency];
};
