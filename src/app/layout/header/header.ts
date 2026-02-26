import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { MatIconModule } from "@angular/material/icon";
import { Router } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, HeaderActions, MatIconModule],
  template: `
    <mat-toolbar class="w-full text-white shadow-lg">
      <div class="max-w-[1200px] mx-auto w-full flex items-center justify-between py-3">

        <!-- Logo -->
        <div class="flex items-center gap-2 cursor-pointer group">
          <span class="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent group-hover:scale-105 transition duration-300">
            نور الهلال
          </span>
          <img src="data:image/webp;base64,UklGRnoMAABXRUJQVlA4IG4MAACQPACdASrYANgAPp1Kn0ulpCKhp9ZY+LATiU3clQQtyyIr0h+Aww8GMfLebbY/9J/a99Pp/zNei/O96P/MT/Xfpu+Y39tP2k9630af4j1B/7l/wOtr9E/pcP3F9MzVZZZbYH0vYCG/u0H97zMAkXJT+0GLg9H3rf47/08C70QCVNy5mZmZmZmZEuWgiv/aHRlW36Nz0lLQkwcIuaPXd10dlvq//F4vmCKXJH/q+XDIrtkS4ubrNFloH5VUi2v0BOtSG9QPQfWyJAQdkiRED4MsSy0BmZmZlrMuY4j6pEJPmjNYp2WSZ8AqOZx1qN0EM2nVUxsEVnD6VnQNjb34t9CRANBqqn/UzT3KcQdB7P6ZQUvOPyPtOds3Xd3d2+wwJ53PR8H2e32Jb/thGBPJzV4z2ZmZiR/B4q3OHrJbGcH41wuPDbWQdrmchgus1dHoiPoxnOUha6pmY0y5FRXn5bwDPNHjUPIQ7x5oySagMKe3ihzVuxRNppY+Qjf/6J/QFB/9epdGSlJwNGqDu5mPKaNiB6bLSElF16s6Vmbhm6GOaAZgHo2kj4acN7vp5vTRLzkX/0htCqqqeaqHRWfJ9ojwNvG/ixQNJgVsIICVQFyXvnvQ0vO7R6eCCj9hSNmZmtorwi/s2ZmZmZmZmZiAAP7+BdAgWi9b4zYH77uxG9rxeHTcH6bVQ0rsfLJyxN618QTZG+6tX4BPleD7Mbmuahes0F4AdlrC3jtI+x3tnBzq0QFv2176Jfa9E8u3eyDleycWxCv3/h4vEI35rs7nDGOkaV34XOSaLc3FDJOLvXrSeann0VuT4eIx8rngtu9HTxJwxoUvgx7knj18DnjUn9+CbnfTDFoyK/m6qubqZsR5VmNHXc9BHc8fhMqkcUx34Tm64TpgByxLgWI+TPpltILcUNqkMO6RvvIupbBhPyVUq1K1nFxEm2GwnBaaKYVIGGnvysqkz/vr60VqV3Vo3gZvt5svsU8LPTRb/DF3j9DcdNvOJoo9+od3HVK3kHPii20u08dpVQfrUD43kfYS7Vo64ZMzzkjd974n8n07soFVslORKooV5WbH67Lfcis8dICQsnLoqyMUwlfwukitUpNm4LjwPWYGTHUG8TsB2ziKWQWVrSDPuSG8f3HVPO6wI2aUk8aNioDl2Yw7At/7Gt3XKGBZlbDwwN/okyfHodetYpT8qLAE5luW33kO71IGQh33u/5G9XZYK5CI0TR9zCwS9A+KImHljaaNdtUH0Eo4fIeAF1hKDxxB9X4Kkl1kTkuczVxsO6WViX60FamwhOCUAFt7/uzdbOdUS2UYbc/QnzHpQjV/hmXFKYKASmY8u3gEzT//MrqjNdxJLaGpne/h3X9753sdlswbAnDhD2vY3Y4qVB8tvlx7bwSOPzuF3fYO4zGzy6ZT4X2Ws4Va5OaWQZNsBabciuviqyOPybIKnCfW16g4oCbdLLBp4fK2ipl69BnlFjpiVt9/UYdG9eWgYLYOHwFI6DRpN/nTrpIE2KEsg9OQsU2S5Q1v5Pb4OpNNDhcCSiDfENf4zby4HeQ9OcKUBJCFszDnhzfYkcD+p0Un+Dbg4dm8K3AB5MQHGYr2RyOzpa0vJeGFFtFPrCp/P/dOXAvQ22ambnbRkYS6+A7dliI2l/n0Vli8P34FOEvMuzeDjgZF30T1mnhdBPxbop2zDm4FYxqwnU+4YrNH4fcdmWm0BrQoMHlB7BWTUNrkS2+gn3c2mdyzLuHVgB0uyX+OwYr3a1AG2cCGzosweGbooYmcmwAPkUQdZYQtZFrQjtT2jmEJOhWuLCTY5BvL++nItOEJeHZHx1bOmtEL1uyJ4lr11uo9VSxtcsBoKPwhfGo8JZLu/abxojllRlt3I4QFJtKf7pvq+fXQGMgvBDmgLU7UyFc7ddEU9rwhHv5g/nOlhUhLaKfffnO5nhOXW1orFbCIhbiF14FKclyEW73/RhO0OrHdifS9RSkDcKNvf5m/8Wzvv/pQymmHKqIhsw5/Con+ruXMrkQo6MXCTbWI2K9cg+rLZmOMJV0zuDLwa5TXizsSf5WRR5Mxgd6vDJmuwiaM/CRVL8hI8BAEbICtEpIN4d5qA8Rhfr5veG6cA2sME7tdbIqbUMBdKHv9AjGC2RhMsO8AE6976xd+U7/jO4x7SNcXY8JQ3MmCG8EJGnTlpCXADJwZGa1bZMbyhCChNI/81J6ci51DcQtmJuIYH46y+k790R1O1awax2KiRlVug5LF/Cp7DxEV+uXQPIANgeZrmgI/GqAa8bwNgx3HqTxvqdzAtCQdOencA/5w8mr+BKzp/mD2eowFv9scY0y3c6gR9sZtTt6D/OtfZ2xT3lU4A0v3G2V6L0h+q13sZUDzGoRwLCNqP9kllwdaX+iyuz1D8R+Og2QL/DUWgjPGXvQSI8OqdUqMcwIJhbyzoKW8GgXKz02BFXkrqd05LfYME5q0TMl/nniUFCgqnt3xxgPTbQ7JqVUf6Kf3sBEqL5rP+I6dQqjyiTHiTpKNu855qy8HeHcZWQTpRdqXXOa/TGgbL6L+IIAE0qjq9gRBVNVV5VSUPuW2LucgE8uUAvkl30gVJINa+9FpJvc4fXyeAf2+CUoOvMiIfA2Qd6mt0DqQpjvKrbr2Nr+lPxOj6vEArJqxTRy6HtYx+cBLq3h4ry4biJiuUs4vopfbcxyT+a1qRCCKIA3CukudMwm28nYChzXy89SzMMXANGbfYVO92I56J/DQikGz4hdanK5pHnGKqeSG8gkyjt4p9Z46Fb59m4/JsMXc83rUI8RVvmjoUZcHQLu3zR8UstBsKHEEbjs/aUuXhYtj/kE+o0oJx4/pFXjtRKPZFGdy4v4Su10YpVmn3cCS3qdK8BSOq3XnlBhDeSEy/V2EqDIUbVgZDBy8ncVuUYg8QO5ge88cAfZBD473WrvqBn9O/6/9WU/XA3MPzWHNLEaEFeHQa2/MSoGg/gN9ZVqFV8Fw3D+OyhvvYMZIO4N9Qdb1R4ny4DEfo0EXmEx9WA+3z++z1T6/4oYgVYlVY0qeRytsNTAdcj1WZuW38iO2rBGDmuBlXh9jhL2YXi9ADapmniABj1P0sZ+1fIszlSut3pEqmKkGQsAww03ZWZPmDQFxWJRrBzZcA96S0q2szdtws2CrATJO0kQtPPWoK4iahh1LzagSsSY5MEmyI/6KL94b9VAX6G7Q9+Ae/DNCf78eYY4fu6s4J8qGSSl8d7OnQIXZUE+VrsqzzwGIoYUPZUNB2hNOlcwx05STU4hvJ/iSZx7VQt60hPgJbVh8xIL7Tg0mc2eNvMOkiVwo3FcqQ9qz2/+4hMlD2iClnAihLPtMvPjXSyYL/fEE87qz9auVAvy2qsSDzC8eoty/udext5xKZ8/vPEpDRwfwgfNkQzvoja3LSlZOe7n5UoRf4eRz25LASqMnfo3UAUZX9VYDfb/YDIf7T4Kb8S+6TRmyJOI8OmmaCAGHiutoVAsZqnVL0JXPvd5NyJlIDy44VIaujkmAdjTTkxNzwxun+qw/C3WtfBdOnxDCRWLn2wchOR0chwn3kRpC0Pp0oBP+jv9pfQpQXi4cHOuEJKtaHQ0+Qn9VjOtGBFxAgO2APW62YS+5hsbNLZRMEv13hZLiukxAgDA2SFOWw5+mm1GT/sYu0lbSneKRDWhwNYvhtREp9v5AFFvauLdF+I0z/mGH+nHu9kNWFcOnRpe4/xlc+57Yrc00g6Dr1x+qPFYU5aJ6Tn00IHXFEO0J7RrPPeriiY+UPx341jBXb/TidshXx/K9pimgl+d9YLU5ScRLJKXPf+iO+mAG9Y48gL/LCYBHV04wVEC/m2b9pUgCySbR4OLg14Gqko92JZuoaZA/yJd6OT62adAHJ8Py7W824jxuF1UdCrqwrdH69nH4IufaggK1wF8d4lTCn4pb82EaWwCX1lmDOf7bJiznSfgmet5F6bzNizQfVxc6C/N9Bi8M8uc70JFS/b5L3ozrrlNLVXKjD9xbvRig3mUYWCBXGbMhCWKrKZR2G/bWlIbp/AoUBhoLHrxvQpm9xezMJLNivgxuZ1+4mYFXPKIQfzvohrEv7EYKDeRtNldc/WtmchnwsWVz+dS5YhXOSa4FE26hlka8GEJgYADp6chWs/B/7G7cclQVa5jiK/ALmHztWaXGvhtjFaZT3QpG9ZG7NuEybF5c7j+xffz0qJnUJYhqW2wSwb9CYl4ZZpJkkHTiEZMFX4dJAEw4AAAAAA==" alt="نور الهلال" class="h-12 w-auto" />
          <span class="hidden md:block text-xs text-gray-300 mt-1">أجواء رمضان تبدأ هنا</span>
        </div>

        <!-- Search -->
        <div class="flex-1 px-6 max-w-xl">
          <div class="relative">
            <input #searchInput type="text" placeholder="ابحث عن منتج..."
              class="w-full border rounded-full py-2 pl-10 pr-4"
              (input)="onSearch(searchInput.value)" />
            <mat-icon class="absolute left-3 top-2.5 text-gray-400">search</mat-icon>
          </div>
        </div>

        <!-- Actions -->
        <app-header-actions></app-header-actions>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    mat-toolbar {
      background-color: white !important;
      color: #333;
    }
  `]
})
export class Header {
  store = inject(EcommerceStore);
  router = inject(Router);

  onSearch(value: string) {
    this.store.setSearch(value);
    this.router.navigate(['/products']);
  }
}
