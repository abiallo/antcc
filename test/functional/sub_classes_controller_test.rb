require 'test_helper'

class SubClassesControllerTest < ActionController::TestCase
  setup do
    @sub_class = sub_classes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sub_classes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sub_class" do
    assert_difference('SubClass.count') do
      post :create, :sub_class => @sub_class.attributes
    end

    assert_redirected_to sub_class_path(assigns(:sub_class))
  end

  test "should show sub_class" do
    get :show, :id => @sub_class.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @sub_class.to_param
    assert_response :success
  end

  test "should update sub_class" do
    put :update, :id => @sub_class.to_param, :sub_class => @sub_class.attributes
    assert_redirected_to sub_class_path(assigns(:sub_class))
  end

  test "should destroy sub_class" do
    assert_difference('SubClass.count', -1) do
      delete :destroy, :id => @sub_class.to_param
    end

    assert_redirected_to sub_classes_path
  end
end
