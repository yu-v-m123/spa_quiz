<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Quiz;

class QuizController extends Controller
{
    public function index(Request $request)
    {
      $category = $request->input('categories');
      if ($category) {
        $category = explode(',', $category);
        return $category;
      } else {
        return [];
      }
    }
}
