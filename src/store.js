import create from "zustand";

export const useStore = create((set) => ({
  location: "Berlin",
  loadingLocation: false,
  setUserLocation: (newLocation) =>
    set((state) => {
      if (typeof window != undefined) {
        localStorage.setItem("user-location-city", newLocation);
      }
      return {
        location: newLocation,
      };
    }),
  setLoadingLocation: (newState) => ({
    loadingLocation: newState,
  }),
}));
