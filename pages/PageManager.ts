import { Page, test } from "@playwright/test";
import DashboardPage from "./DashboardPage";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import LoginPage from "./LoginPage";
import OrderComplete from "./OrderComplete";
import MyOrder from "./MyOrderPage";

export default class PageManager {
    private readonly page: Page;
    private readonly loginPage: LoginPage;
    private readonly dashboardPage: DashboardPage;
    private readonly cartPage: CartPage;
    private readonly checkoutPage: CheckoutPage
    private readonly orderComplete: OrderComplete;
    private readonly myOrderPage: MyOrder;


    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.orderComplete = new OrderComplete(page);
        this.myOrderPage = new MyOrder(page);
    }

    onLoginPage() {
        return this.loginPage;
    }

    onDashboardPage() {
        return this.dashboardPage;
    }

    onCartPage() {
        return this.cartPage;
    }

    onCheckoutPage() {
        return this.checkoutPage;
    }

    onOrderCompletePage() {
        return this.orderComplete;
    }

    onMyOrderPage() {
        return this.myOrderPage;
    }


}