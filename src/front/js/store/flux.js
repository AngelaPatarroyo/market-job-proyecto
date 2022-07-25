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
      tipoFreelancer: [],
      idiomas: [],
      idiomasFreelancer: [],
      experiencias: [],
      perfilesFreelancer: [],
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
          setStore({ accessToken: data.accessToken });
          localStorage.setItem("accessToken", data.accessToken);
          localStorage.setItem("id", data.id);
          console.log(data);
          return data;
        } catch (error) {
          console.log("Error login", error);
        }
      },
      signup: async (body) => {
        console.log(body);
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

      getTipodeFreelancer: async () => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/get_tipos_freelancer",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();

          console.log(data);
          setStore({ tipoFreelancer: data });
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
          setStore({ roles: data });
        } catch (error) {
          console.log("Error registro", error);
        }
      },
      getIdiomasFreelancer: async () => {
        const store = getStore();
        console.log(store.accessToken);
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/get_idiomas_freelancer",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();
          setStore({ idiomasFreelancer: data });
          return data;
        } catch (error) {
          console.log("Error al obtener idiomas", error);
        }
      },
      getIdiomas: async () => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/get_idiomas",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();

          console.log(data);
          setStore({ idiomas: data });
          return data;
        } catch (error) {
          console.log("Error idiomas", error);
        }
      },
      agregarIdioma: async (body) => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/add_idioma",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();
          getActions().getIdiomasFreelancer();
          console.log(data);
          return data;
        } catch (error) {
          console.log("Error agregar idioma", error);
        }
      },
      getExperiencias: async () => {
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/get_experiencias",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();

          console.log(data);
          setStore({ experiencias: data });
          return data;
        } catch (error) {
          console.log("Error experiencias", error);
        }
      },
      completarPerfil: async (body) => {
        console.log(body);
        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/completar_perfil",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();

          console.log(data);
          return data;
        } catch (error) {
          console.log("Error al completar perfil", error);
        }
      },

      buscaFreelancer: async (id_tipo, id_experiencia) => {
        let params = [];
        let params_str = "";

        if (id_tipo) {
          params.push("id_tipo=" + id_tipo);
        }
        if (id_experiencia) {
          params.push("id_experiencia=" + id_experiencia);
        }

        params_str = params.join("&");

        if (params_str) {
          params_str = "?" + params_str;
        }

        try {
          const resp = await fetch(
            process.env.BACKEND_URL + "/api/ver_perfiles" + params_str,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("accessToken"),
              },
            }
          );
          const data = await resp.json();
          setStore({ perfilesFreelancer: data });
          // console.log(data);
          return data;
        } catch (error) {
          console.log("Error al obtener perfiles", error);
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
