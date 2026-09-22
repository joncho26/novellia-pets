import { Controller, Get } from "@nestjs/common";
import { DashboardService } from "./dashboard.service";

@Controller()
export class DashboardController {
    constructor(private dashboardService: DashboardService){}

    @Get('dashboard')
    getDashboard() {
        return this.dashboardService.getDashboard();
    }
}
