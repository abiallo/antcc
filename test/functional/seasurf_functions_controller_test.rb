require 'test_helper'

class SeasurfFunctionsControllerTest < ActionController::TestCase
  setup do
    @seasurf_function = seasurf_functions(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:seasurf_functions)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create seasurf_function" do
    assert_difference('SeasurfFunction.count') do
      post :create, :seasurf_function => @seasurf_function.attributes
    end

    assert_redirected_to seasurf_function_path(assigns(:seasurf_function))
  end

  test "should show seasurf_function" do
    get :show, :id => @seasurf_function.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @seasurf_function.to_param
    assert_response :success
  end

  test "should update seasurf_function" do
    put :update, :id => @seasurf_function.to_param, :seasurf_function => @seasurf_function.attributes
    assert_redirected_to seasurf_function_path(assigns(:seasurf_function))
  end

  test "should destroy seasurf_function" do
    assert_difference('SeasurfFunction.count', -1) do
      delete :destroy, :id => @seasurf_function.to_param
    end

    assert_redirected_to seasurf_functions_path
  end
end
