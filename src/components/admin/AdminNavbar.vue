<template>
    <div class="sidebar d-flex flex-column justify-content-between w-25 bg-primaryDark vh-100 p-12">
        <div>
            <img class="logo mb-10 w-100" src="../../assets/images/logo_white.png" alt="">
            <ul class="navbar-nav flex-column navUnderline w-100 me-3">
                <li class="nav-item d-flex align-items-center px-0 mb-4">
                    <router-link class="nav-link w-100" to="/admin/products">
                    <i class="fa-solid fa-book me-5"></i>商品管理</router-link>
                </li>
                <li class="nav-item d-flex align-items-center px-0 mb-4">
                    <router-link class="nav-link w-100" to="/admin/orders">
                    <i class="fa-solid fa-file-lines me-5"></i>訂單管理</router-link>
                </li>
                <li class="nav-item d-flex align-items-center px-0">
                    <router-link class="nav-link w-100" to="/admin/coupons">
                    <i class="fa-solid fa-ticket me-5"></i>優惠券管理</router-link>
                </li>
            </ul>
        </div>

        <div>
            <div class="btn btn-outline-light d-flex justify-content-center align-items-center mb-4">
            <i class="fa-solid fa-arrow-right-from-bracket me-2"></i>登出
            </div>

            <router-link type="button"
            class="btn  btn-light d-flex justify-content-center align-items-center text-primaryDark" to="/">
            <i class="fa-solid fa-house-chimney me-2 "></i>
            回到前台</router-link>
        </div>
</div>
</template>
