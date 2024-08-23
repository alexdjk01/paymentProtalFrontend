import React from 'react'

export default function Login() {
  return (
    <div>
        <section class="vh-100 custom-container d-flex justify-content-center align-items-center">
            <div class="container py-5 custom-container">
                <div class="row justify-content-center">
                    <div class="col-md-4">
                        <div class="card card-registration ">
                            <div class="card-body p-md-5 text-black custom-card-form">
                                <h3 class="mb-5 text-uppercase text-center">Login</h3>

                                
                                    <div class="col-md mb-4">
                                        <div class="form-outline">
                                                <label class="form-label" for="email">Email</label>
                                                <input type="email" id="emailInput" class="form-control form-control-md" placeholder="Enter email"/>
                                        </div>
                                    </div>
                                    <div class="col-md mb-4">
                                        <div class="form-outline">
                                            <label class="form-label" for="password">Password</label>
                                            <input type="password" id="passwordInput" class="form-control form-control-md" placeholder="Enter password"/>
                                        </div>
                                    </div>


                                    <div class="d-flex justify-content-center">
                                        <button type="reset" class="btn btn-danger btn-lg me-2">Back</button>
                                        <button type="submit" class="btn btn-success btn-lg">Login</button>
                                    </div>
                                

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}
