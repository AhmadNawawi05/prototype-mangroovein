<template>
  <header id="up" class="bg-center bg-fixed bg-no-repeat bg-cover h-screen">
    <!-- Overlay Background + Center Control -->
    <div class="h-screen bg-opacity-50 bg-black flex items-center justify-center" style="background:rgba(0,0,0,0.5);">
      <div class="mx-2 text-center">
        <h1 class="text-[#FAF1E4] font-extrabold text-4xl xs:text-5xl md:text-6xl">
          <span class="text-[#FAF1E4]">Right</span> Place To
        </h1>
        <h2 class="text-[#FAF1E4] font-extrabold text-3xl xs:text-4xl md:text-5xl leading-tight">
          Get a <span class="text-[#FAF1E4]">Better</span> and <span class="text-[#FAF1E4]">Professionals</span> Design
        </h2>

        <div class="py-6">
          <button
            class="bg-[#9EB384] text-black active:bg-[#9EB384] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            Regular
          </button>
          <button
            class="bg-[#9EB384] text-black active:bg-[#9EB384] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button">
            Regular
          </button>
        </div>
      </div>
    </div>
  </header>
  </template>
<style>
header {
  background: url('https://images.unsplash.com/photo-1520333764090-778d6dc95ec3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVtYW5kYW5nYW4lMjBtYW5ncm92ZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60');
}
</style>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      (response) => {
        this.content = response.data;
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
};
</script>