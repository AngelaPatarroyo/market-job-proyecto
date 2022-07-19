const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      accessToken: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      roles: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },

      login: async (body) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          setStore({accessToken:data.accessToken})
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("id", data.id);
          console.log(data);
          return data;
        } catch (error) {
          console.log("Error login", error);
        }
      },

      signup: async (body) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/signup", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();

          console.log(data);
          return data;
        } catch (error) {
          console.log("Error registro", error);
        }
      },
      get_roles: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/get_rols", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await resp.json();
          setStore({roles:data})
        } catch (error) {
          console.log("Error registro", error);
        }
      },
      get_idiomas: async () => {
       const store = getStore()
       console.log(store.accessToken); 
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/get_idiomas_freelancer", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer "+ localStorage.getItem("accessToken"),
            },
          });
          const data = await resp.json();
         console.log(data)
         return data
        } catch (error) {
          console.log("Error registro", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },
    },
  };
};

export default getState;
