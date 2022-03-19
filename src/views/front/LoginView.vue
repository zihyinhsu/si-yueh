<template>
<div class="position-relative bg-light vh-82.5">
  <div class="banner">
      <img class="w-100" src="https://cdn-news.readmoo.com/wp-content/uploads/2020/10/annelies-geneyn-bhBONc07WsI-unsplash.jpg" alt="">
  </div>
     <div class="container position-absolute top-50 start-50 translate-middle">
        <div class="row justify-content-center">
            <div class="col-md-4">
                <form id="form" class="form-signin">
                  <div class="bg-white box-shadow p-8 rounded-4">
                    <h1 class="text-center text-secondaryDark fw-bold mb-5">後臺管理</h1>
                    <div class="mb-5">
                        <label for="Email address" class="form-label text-secondaryDark w-100">Email</label>
                        <input type="email" class="form-control border-secondaryDark"

                        id="Email address" placeholder="name@example.com">
                    </div>
                    <div class="mb-5">
                        <label for="password" class="form-label text-secondaryDark w-100">密碼</label>
                        <input type="password" class="form-control border-secondaryDark" id="password">
                    </div>
                    <button type="submit" class="btn btn-primary text-white w-100" >登入</button>
                  </div>
                </form>
            </div>
        </div>
    </div>
</div>
</template>
